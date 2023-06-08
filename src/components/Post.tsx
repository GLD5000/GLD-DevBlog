'use client';

import React from "react";
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import {Post} from '@prisma/client';

export interface PostProps extends Post {
  author: {name: string | null} |null
};

const BlogPost: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Link href={`/${post.id}/`}>
    <div className="mx-auto w-fit">
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      {post.content?<ReactMarkdown className="prose dark:prose-invert">{post.content}</ReactMarkdown>:null}

    </div>
    </Link>
  );
};

export default BlogPost;
