import prisma from "@/lib/prisma";
// UNPUBLISH /api/unpublish/:id
async function handler(req: Request,context: {[key:string]: {[key:string]: string}}) {
  const postId = context.params.id;
  const result = await prisma.post.update({
    where: { id: postId },
    data: { published: false },  });
  return new Response(JSON.stringify(result));
}

export { handler as POST };
