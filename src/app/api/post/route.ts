import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

async function createTagOnPost(tagName: string, postId: string) {
  const tagResult = await prisma.tag.upsert({
    where: { name: tagName.trim() },
    create: { name: tagName.trim() },
    update: {},
  });
  const tagOnPostResult = await prisma.tagOnPosts.create({
    data: { postId: postId, tagId: tagResult.id },
  });
}

function addTags(tags: string[], postId: string) {
  tags.forEach(async (tag) => {
    await createTagOnPost(tag, postId);
  });
}

async function handler(req: Request, res: Response) {
  const { title, content, publish, tags } = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ? session.user.email : undefined;
  const postResult = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: publish,
      author: { connect: { email } },
    },
  });

  if (!!tags.length) addTags(tags, postResult.id);

  console.log("JSON.stringify(postResult):", JSON.stringify(postResult));
  return new Response(JSON.stringify(postResult));
}

export { handler as POST };
