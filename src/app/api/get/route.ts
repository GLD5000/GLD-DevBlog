import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url ? req.url : "");
  const authorEmail = searchParams.get("authorEmail");
  try {
    const drafts = await prisma.post.findMany({
      where: {
        author: { email: authorEmail },
        published: false,
      },
      orderBy: { createdAt: "desc" },
      include: {
        tags: {
          orderBy: { tag: { name: "asc" } },
          select: { tag: true },
        },
        author: {
          select: { name: true },
        },
      },
    });

    const published = await prisma.post.findMany({
      where: {
        author: { email: authorEmail },
        published: true,
      },
      orderBy: { createdAt: "desc" },
      include: {
        tags: {
          orderBy: { tag: { name: "asc" } },
          select: { tag: true },
        },
        author: {
          select: { name: true },
        },
      },
    });

    const data = { drafts, published };
    return new Response(JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

export { handler as GET };
