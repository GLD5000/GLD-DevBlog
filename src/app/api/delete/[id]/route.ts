import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// DELETE /api/delete/:id
/* eslint-disable import/prefer-default-export */

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

async function handler(
  req: Request,
  context: { [key: string]: { [key: string]: string } }
) {
  const postId = context.params.id;
  if (req.method === "DELETE") {
    const result = await prisma.post.delete({
      where: { id: postId },
    });
    await deleteTagsWithEmptyTagOnPostsArray();
    revalidatePath("/");
    return new Response(JSON.stringify(result));
  }
  throw new Error(
    `The HTTP ${req.method} method is not supported at this route.`
  );
}

export { handler as DELETE };
