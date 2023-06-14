"use client";

import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";


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
  const router = useRouter();

  return (
    <button
      onClick={()=> router.push(`/blogpost/${postId}/`)}
      className="mx-auto shadow-lg dark:drop-shadow-post-dk border border-transparent dark:border-black prose dark:prose-invert w-full  bg-bg-var hover:transition focus:transition dark:focus:invert dark:hover:invert hover:bg-black hover:text-white focus:bg-black hover:prose-invert focus:prose-invert focus:text-white dark:bg-bg-var-dk rounded p-2 grid gap-2"
    >
      <h2 className="break-words break-all">{post.title}</h2>
      <small className="font-bold">By {authorName}</small>
      <small>{post.updatedAt.toLocaleDateString("en-GB", {dateStyle:'long'})}</small>
    </button>
  );
};

export default BlogPost;
