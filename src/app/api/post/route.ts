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
    where: { unique_post_tag: {postId,tagId: tagResult.id}}, 
    create: { postId: postId, tagId: tagResult.id },
    update:{},
  });
}

function addTags(tags: string[], postId: string) {
  tags.forEach(async (tag) => {
    await createTagOnPost(tag, postId);
  });
}

async function handler(req: Request, res: Response) {
  const { title, content, publish, tags, id } = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ? session.user.email : undefined;
  const postResult = await prisma.post.upsert({
    where: {id:id },
    create: {
      title: title,
      content: content,
      published: publish,
      author: { connect: { email } },
    },
    update:{
      title: title,
      content: content,
      published: publish,
    }
  });

  if (!!tags.length) addTags(tags, postResult.id);

  console.log("JSON.stringify(postResult):", JSON.stringify(postResult));
  return new Response(JSON.stringify(postResult));
}

export { handler as POST };
