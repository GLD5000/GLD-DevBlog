import {  getServerSession } from "next-auth";
import  {authOptions}  from "@/pages/api/auth/[...nextauth]";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
async function handler(req: Request, res: Response) {
  const { title, content, publish } = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ? session.user.email : undefined;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: publish,
      author: { connect: { email } },
    },
  });
  return new Response(JSON.stringify(result));
}

export { handler as POST };
