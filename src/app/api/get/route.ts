import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

/* eslint-disable import/prefer-default-export */

async function handler(req: NextRequest) {
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
          select: { name: true, email: true },
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
          select: { name: true, email: true },
        },
      },
    });

    const data = { drafts, published };
    return new Response(JSON.stringify(data));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify(err));
  }
}

export { handler as GET };
