"use client";

import React from "react";
import { Post, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import TagSet from "./TagSet";
import Image from "next/image";
import getGradient from "@/utilities/colour/getGradient";

export interface PostProps extends Post {
  author: { name: string | null } | null;
  tags: {
    tag: Tag;
  }[];
}

export interface PostEmailProps extends Post {
  author: { name: string | null; email: string | null } | null;
}

const BlogPost: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const title = post!.title;
  const readTime = post!.readTime;

  const postId = post.id;
  const updated = new Date(post.updatedAt);
  const router = useRouter();
  const tags = post!.tags;
  const gradientStyle = getGradient(tags);
  const sourceImage = '/Bokeh.svg';
  return (
    <div className="mx-auto shadow-lg dark:drop-shadow-post-dk  w-full bg-bg-var dark:bg-bg-var-dk rounded  grid gap-2">
      <button
        className=" rounded-t rounded-b-none grid my-0 pb-2 text-txt-mid dark:text-txt-mid-dk dark:border-txt-main w-fit mx-auto rounded bg-bg-var hover:transition focus:transition  
        hover:text-txt-main dark:hover:text-txt-main-dk focus:text-txt-main dark:focus:text-txt-main-dk dark:bg-bg-var-dk hover:grayscale focus:grayscale"
        onClick={() => router.push(`/blogpost/${postId}/`)}
      >
        <Image
          width={1000}
          height={400}
          style={gradientStyle}
          className="my-0 rounded-t"
          src={sourceImage}
          alt={"Tech Image"}
        />
        <div className="flex flex-wrap ml-auto p-2 text-txt-mid dark:text-txt-mid-dk">
          <small className="font-bold p-2">{`${authorName}`}</small>
          <small className="p-2">
            {updated.toLocaleDateString("en-GB", { dateStyle: "long" })}
          </small>  
          <small className="p-2">
            {`${readTime} min read`}
          </small>
        </div>
        <h1 className="text-inherit break-words break-all text-center p-4">
          {title}
        </h1>
      </button>
      {!!tags.length && !!tags ? (
        <TagSet tagsObject={tags} />
      ) : null}
    </div>
  );
};

export default BlogPost;


