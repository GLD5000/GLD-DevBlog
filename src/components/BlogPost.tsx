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
    <div className="mx-auto w-full prose dark:prose-invert bg-bg-var dark:bg-bg-var-dk rounded p-2 min-w-[17.5rem]">
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      {/* {post.content?<ReactMarkdown >{post.content}</ReactMarkdown>:null} */}

    </div>
    </Link>
  );
};

export default BlogPost;
