/* eslint-disable import/prefer-default-export */

import prisma from "@/lib/prisma/prisma";
import { FormSliceState } from "@/lib/redux";
import { Tag } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: {
    [key: string]: { [key: string]: string };
  }
) {
  const postId = context.params.id;
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>postId:", postId);
  const { post, tagNames } = await getBlog(postId);
  const data: FormSliceState = {
    id: post?.id || "",
    title: post?.title || "",
    content: post?.content || "",
    tags: tagNames || undefined,
    tagString: "",
    publish: post?.published || false,
    status: "idle",
  };

  return NextResponse.json({ data });
}

async function getBlog(idIn: string) {
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
  return newArray;
}
