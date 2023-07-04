"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Post, Tag } from "@prisma/client";
import getGradient from "@/utilities/colour/getGradient";
import TagSet from "./TagSet";

export interface PostProps extends Post {
  author: { name: string | null } | null;
  tags: {
    tag: Tag;
  }[];
}

export interface PostEmailProps extends Post {
  author: { name: string | null; email: string | null } | null;
}

export default function BlogPost({ post }: { post: PostProps }) {
  const authorName = post.author ? post.author.name : "Unknown author";
  let { title } = post;
  let subtitle = "";
  const hasSubtitle = title.includes(":");
  if (hasSubtitle) {
    [title, subtitle] = title.split(":");
  }
  const { readTime } = post;

  const postId = post.id;
  const updated = new Date(post.updatedAt);
  const router = useRouter();
  const { tags } = post;
  const gradientStyle = getGradient(tags);
  const sourceImage = "/Bokeh.svg";
  return (
    <div className="mx-auto grid w-full  gap-2 rounded bg-bg-var shadow-lg  dark:bg-bg-var-dk dark:drop-shadow-post-dk">
      <button
        type="button"
        className=" mx-auto my-0 grid w-fit rounded rounded-b-none rounded-t bg-bg-var pb-2 text-txt-mid hover:text-txt-main hover:grayscale hover:transition focus:text-txt-main  
        focus:grayscale focus:transition dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-mid-dk dark:hover:text-txt-main-dk dark:focus:text-txt-main-dk"
        onClick={() => router.push(`/blogpost/${postId}/`)}
      >
        <Image
          width={1000}
          height={400}
          style={gradientStyle}
          className="my-0 rounded-t"
          src={sourceImage}
          alt="Tech Image"
        />
        <div className="ml-auto flex flex-wrap p-2 text-txt-mid dark:text-txt-mid-dk">
          <small className="p-2 font-bold">{`${authorName}`}</small>
          <small className="p-2">
            {updated.toLocaleDateString("en-GB", { dateStyle: "long" })}
          </small>
          <small className="p-2">{`${readTime} min read`}</small>
        </div>
        {hasSubtitle ? (
          <>
            <h1 className="mx-auto my-4 w-fit break-words text-center text-6xl font-bold text-txt-main dark:text-txt-main-dk">
              {title || `no title`}
            </h1>
            <h2 className="mx-auto my-4 w-fit break-words text-center text-4xl font-bold text-txt-main dark:text-txt-main-dk">
              {subtitle || ``}
            </h2>
          </>
        ) : (
          <h1 className="mx-auto my-4 w-fit break-words text-center text-6xl font-bold text-txt-main dark:text-txt-main-dk">
            {title || `no title`}
          </h1>
        )}
      </button>
      {tags.length && tags ? <TagSet tagsObject={tags} /> : null}
    </div>
  );
}
