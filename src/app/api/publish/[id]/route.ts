import prisma from "../../../../lib/prisma";
// PUBLISH /api/publish/:id
async function handler(req: Request,context: {[key:string]: {[key:string]: string}}) {
  const postId = context.params.id;
  const result = await prisma.post.update({
    where: { id: postId },
    data: { published: true },  });
  return new Response(JSON.stringify(result));
}

export { handler as POST };
