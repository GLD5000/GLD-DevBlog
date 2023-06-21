"use client";

import React from "react";
import { Post, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import TagSet from "./TagSet";
import Image from "next/image";

export interface PostProps extends Post {
  author: { name: string | null } | null;
  tags: {
    tag: Tag | null;
  }[];
}

export interface PostEmailProps extends Post {
  author: { name: string | null; email: string | null } | null;
}

const BlogPost: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const postId = post.id;
  // console.log('postId:', postId);
  const router = useRouter();
  const tagNames = post.tags
    .map((tag) => {
      if (!!!tag.tag) return null;
      const tagObject = tag.tag;
      return tagObject.name;
    })
    .join(",");
  const sourceImage =
    !Array.isArray(tagNames) || tagNames.length < 3
      ? `https://source.unsplash.com/random/1000x400/?${tagNames},random`
      : `https://source.unsplash.com/random/1000x400/?${tagNames}`;
  return (
    <div className="mx-auto shadow-lg dark:drop-shadow-post-dk  w-full bg-bg-var dark:bg-bg-var-dk rounded  grid gap-2">
      <button
        className=" rounded-t rounded-b-none grid my-0 pb-2 text-txt-mid dark:text-txt-mid-dk dark:border-black w-fit mx-auto rounded bg-bg-var hover:transition focus:transition  
        hover:text-txt-main dark:hover:text-txt-main-dk focus:text-txt-main dark:focus:text-txt-main-dk dark:bg-bg-var-dk"
        onClick={() => router.push(`/blogpost/${postId}/`)}
      >
        <Image
          width={1000}
          height={400}
          className="my-0"
          src={sourceImage}
          alt={"Tech Image"}
        />
        <div className="flex">
          <small className="font-bold p-2">{`${authorName}`}</small>
                <small className="p-2">
          {post.updatedAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
                </small>
        </div>
        <h1 className="text-inherit break-words break-all text-center">{post.title}</h1>

      </button>
      {!!post.tags.length && !!post.tags ? (
        <TagSet tagsObject={post.tags} />
      ) : null}
    </div>
  );
};

export default BlogPost;
