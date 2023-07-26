import prisma from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
// UNPUBLISH /api/unpublish/:id
/* eslint-disable import/prefer-default-export */
async function handler(
  req: Request,
  context: { [key: string]: { [key: string]: string } }
) {
  const postId = context.params.id;
  const result = await prisma.post.update({
    where: { id: postId },
    data: { published: false },
  });
  revalidatePath("/");
  return new Response(JSON.stringify(result));
}

export { handler as POST };
