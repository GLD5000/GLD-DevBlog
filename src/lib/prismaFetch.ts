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

export default async function getBlogs(): Promise<{
  props: PostEmailProps[];
}> {
  const posts: PostEmailProps[] = await prisma.post.findMany({
    where: {
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
  return {
    props: posts,
  };
}

export async function getDrafts(sessionData: Session): Promise<{
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

export async function getBlog(idIn: string) {
  const post = await prisma.post.findFirst({
    where: { id: idIn },
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
  const tagNames = post?.tags ? extractTagNames(post?.tags) : null;
  return {
    post,
    tagNames,
  };
}

function extractTagNames(tagArray: { tag: Tag | null }[]) {
  const newArray: [string, string][] = tagArray
    .map((tagObject): [string, string] => {
      if (tagObject.tag)
        return [
          tagObject.tag.name as string,
          tagObject.tag.backgroundColour as string,
        ];
      return ["", ""];
    })
    .filter((x) => x.join().length !== 0);
  const returnMap: Map<string, string> = new Map(newArray);
  return returnMap;
}
