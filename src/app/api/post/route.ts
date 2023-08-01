import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";

/* eslint-disable import/prefer-default-export */

// Required fields in body: title
// Optional fields in body: content

function makeNewTag(tagArray: string[]) {
  const backgroundColour = tagArray[1];
  const newTag = {
    name: tagArray[0].trim(),
    backgroundColour,
  };
  return newTag;
}

async function createTagOnPost(tagArray: string[], postId: string) {
  const newTag = makeNewTag(tagArray);
  console.log("newTag:", newTag);
  const tagResult = await prisma.tag.upsert({
    where: { name: newTag.name },
    create: { ...newTag },
    update: { backgroundColour: newTag.backgroundColour },
  });
  console.log("tagResult:", tagResult);
  const uniqueTagOnPostObject = { postId, tagId: tagResult.id };
  console.log("uniqueTagOnPostObject:", uniqueTagOnPostObject);
  await prisma.tagOnPosts.upsert({
    where: { unique_post_tag: uniqueTagOnPostObject },
    create: uniqueTagOnPostObject,
    update: {},
  });
}

async function addTags(tagsArray: [string, string][], postId: string) {
  await cleanUpTags(postId, tagsArray);
  Array.from(tagsArray).forEach(async (tag) => {
    await createTagOnPost(tag, postId);
  });
  await deleteTagsWithEmptyTagOnPostsArray();
}

async function deleteTagsWithEmptyTagOnPostsArray() {
  try {
    await prisma.tag.deleteMany({
      where: {
        posts: { none: {} },
      },
    });
  } catch (error) {
    console.error("Error deleting tags:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanUpTags(postId: string, tagsArray: [string, string][]) {
  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: { tags: { select: { tag: true } } },
  });
  const tagsMap = new Map(tagsArray as [string, string][]);
  const TagsToDelete = post?.tags
    .map((object) => ({ name: object.tag.name, id: object.tag.id }))
    .filter((tagObject) => !tagsMap.has(tagObject.name));

  if (!TagsToDelete || TagsToDelete.length === 0) return;

  TagsToDelete.forEach(async (tag) => {
    await prisma.tagOnPosts.delete({
      where: { unique_post_tag: { postId, tagId: tag.id } },
    });
  });
}

async function handler(req: Request) {
  const { title, content, publish, tags, id, readTime } = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ? session.user.email : undefined;
  const postResult = id
    ? await prisma.post.upsert({
        where: { id },
        create: {
          title,
          content,
          published: publish,
          readTime,
          author: { connect: { email } },
        },
        update: {
          title,
          content,
          published: publish,
          readTime,
        },
      })
    : await prisma.post.create({
        data: {
          title,
          content,
          published: publish,
          readTime,
          author: { connect: { email } },
        },
      });
  if (tags && tags.length) addTags(tags, postResult.id);
  revalidatePath("/");
  return new Response(JSON.stringify(postResult));
}

export { handler as POST };
