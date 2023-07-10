import { Session } from "next-auth";
import { Post, Tag } from "@prisma/client";
import prisma from "./prisma";

export interface PostProps extends Post {
  author: { name: string | null } | null;
  tags: {
    tag: Tag;
  }[];
}

export interface PostEmailProps extends PostProps {
  author: { name: string | null; email?: string | null } | null;
}

export default async function getData(sessionData: Session): Promise<{
  published: PostProps[];
  drafts: PostProps[];
}> {
  const drafts: PostProps[] = await prisma.post.findMany({
    where: {
      author: { email: sessionData?.user?.email },
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
  const published: PostProps[] = await prisma.post.findMany({
    where: {
      author: { email: sessionData?.user?.email },
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

  return {
    published,
    drafts,
  };
}
