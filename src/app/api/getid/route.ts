import prisma from "@/lib/prisma";
// PUBLISH /api/publish/:id
async function handler(
  req: Request
  
) {
  // console.log("heeeeoeeoeleoeineoineoienoeineoineoienoienoeineoin");
  const postId = `${req.json()}`;

  const result = await prisma.post.findFirst({
    where: { id: postId },
    orderBy: {createdAt: 'desc'},
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return new Response(JSON.stringify(result));
}

export { handler as GET };
