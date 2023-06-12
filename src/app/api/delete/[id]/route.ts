import prisma from "@/lib/prisma";
// DELETE /api/delete/:id
async function handler(req: Request, context: {[key:string]: {[key:string]: string}}) {
  // console.log("delete route")
  const postId = context.params.id;
  if (req.method === "DELETE") {
    const result = await prisma.post.delete({
      where: { id: postId },
    });
    return new Response(JSON.stringify(result));
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

export { handler as DELETE };
