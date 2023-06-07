import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// DELETE /api/post/:id
async function handler(req: Request, res: Response) {
  const post = await req.json();
  const postId = post.id;
  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    return new Response(JSON.stringify(post));
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

export { handler as POST };
