import {  getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = JSON.parse(req.body);

  const session = await getServerSession(authOptions);
  const email = session?.user?.email ? session.user.email : undefined;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email } },
    },
  });
  res.json(result);
}

export { handler as POST };
