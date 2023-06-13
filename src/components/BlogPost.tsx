"use client";

import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Post } from "@prisma/client";

export interface PostProps extends Post {
  author: { name: string | null } | null;
}

export interface PostEmailProps extends Post {
  author: { name: string | null; email: string | null } | null;
}

const BlogPost: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const postId = post.id;
  // console.log('postId:', postId);
  return (
    <Link
      href={`blogpost/${postId}/`}
      className="mx-auto w-full prose dark:prose-invert bg-bg-var dark:bg-bg-var-dk rounded p-2 min-w-[17.5rem] grid gap-2"
    >
      <h2>{post.title}</h2>
      <small className="font-bold">By {authorName}</small>
      <small>{post.updatedAt.toLocaleDateString("en-GB", {dateStyle:'long'})}</small>
    </Link>
  );
};

export default BlogPost;
