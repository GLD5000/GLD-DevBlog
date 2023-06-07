import {  getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../lib/prisma";
import { NextResponse } from 'next/server';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
async function handler(req: Request, res: Response) {
  const { title, content } = await req.json();
  console.log('req:', JSON.stringify(req));
  console.log('req.body:', req.body);
console.log('title:', title);
console.log('content:', content);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ? session.user.email : undefined;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email } },
    },
  });
  return new Response(JSON.stringify(result));
}

export { handler as POST };
