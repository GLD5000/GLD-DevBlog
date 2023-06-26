import prisma from "@/lib/prisma";
// DELETE /api/delete/:id

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

async function handler(req: Request, context: {[key:string]: {[key:string]: string}}) {
  const postId = context.params.id;
  if (req.method === "DELETE") {
    const result = await prisma.post.delete({
      where: { id: postId },
    });
    await deleteTagsWithEmptyTagOnPostsArray();
    return new Response(JSON.stringify(result));
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

export { handler as DELETE };
