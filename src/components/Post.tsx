'use client';

import React from "react";
import Link from 'next/link';
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string | null;
    // email: string;
  } | null;
  content: string | null;
  published: boolean |null;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Link href={`/${post.id}/`}>
    <div className="mx-auto w-fit">
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      {post.content?<ReactMarkdown>{post.content}</ReactMarkdown>:null}

    </div>
    </Link>
  );
};

export default Post;
