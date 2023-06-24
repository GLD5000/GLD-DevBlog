import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import makeNewTag from "@/utilities/newTagMaker";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

async function createTagOnPost(tagName: string, postId: string) {
  const newTag = makeNewTag(tagName);

  const tagResult = await prisma.tag.upsert({
    where: { name: tagName.trim() },
    create: { ...newTag },
    update: {},
  });
  await prisma.tagOnPosts.upsert({
    where: { unique_post_tag: { postId, tagId: tagResult.id } },
    create: { postId: postId, tagId: tagResult.id },
    update: {},
  });
}


async function addTags(tags: string[], postId: string) {
  await cleanUpTags(postId, tags);
  tags.forEach(async (tag) => {
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
    console.log("Tags deleted successfully.");
  } catch (error) {
    console.error("Error deleting tags:", error);
  } finally {
    await prisma.$disconnect();
  }
}



async function cleanUpTags(postId: string, tags: string[]) {
  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: { tags: { select: { tag: true } } },
  });

  const TagsToDelete = post?.tags.map(object => { return { name: object.tag.name, id: object.tag.id }; }).filter(tagObject => !tags.includes(tagObject.name));

  if (!!!TagsToDelete || TagsToDelete.length=== 0) return;
  
  TagsToDelete.forEach(async (tag) => {
    await prisma.tagOnPosts.delete({
      where: { unique_post_tag: { postId, tagId: tag.id } }
    });
  });

  

}

async function handler(req: Request, res: Response) {
  const { title, content, publish, tags, id, readTime } = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ? session.user.email : undefined;
  const postResult = !!id
    ? await prisma.post.upsert({
        where: { id: id },
        create: {
          title: title,
          content: content,
          published: publish,
          readTime: readTime,
          author: { connect: { email } },
        },
        update: {
          title: title,
          content: content,
          published: publish,
          readTime: readTime,
        },
      })
    : await prisma.post.create({
        data: {
          title: title,
          content: content,
          published: publish,
          readTime: readTime,
          author: { connect: { email } },
        },
      });

  if (!!tags && !!tags.length) addTags(tags, postResult.id);

  console.log("JSON.stringify(postResult):", JSON.stringify(postResult));
  return new Response(JSON.stringify(postResult));
}

export { handler as POST };
