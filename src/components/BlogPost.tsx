"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Post, Tag } from "@prisma/client";
import getGradient from "@/utilities/colour/getGradient";
import { useSession } from "next-auth/react";
import TagSet from "./TagSet";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import UnpublishButton from "./UnpublishButton";
import PublishButton from "./publishButton";

export interface PostProps extends Post {
  author: { name: string | null } | null;
  tags: {
    tag: Tag;
  }[];
}

export interface PostEmailProps extends PostProps {
  author: { name: string | null; email?: string | null } | null;
}

export default function BlogPost({ post }: { post: PostEmailProps }) {
  const { data: session } = useSession();
  const isUserMatch =
    session?.user?.email && post.author?.email
      ? session.user.email === post.author.email
      : false;

  const authorName = post.author ? post.author.name : "Unknown author";
  let { title } = post;
  let subtitle = "";
  const hasSubtitle = title.includes(":");
  if (hasSubtitle) {
    [title, subtitle] = title.split(":");
  }
  const { readTime, published, id } = post;
  const updated = new Date(post.createdAt);
  const router = useRouter();
  const { tags } = post;
  const gradientStyle = getGradient(tags);
  const sourceImage = "/Bokeh.svg";

  return (
    <div className="mx-auto grid w-full  gap-2 rounded bg-bg-var shadow-lg  dark:bg-bg-var-dk dark:drop-shadow-post-dk">
      <button
        type="button"
        className=" mx-auto my-0 grid w-fit rounded rounded-b-none rounded-t bg-bg-var pb-2 text-txt-mid hover:bg-bg hover:text-txt-main hover:transition focus:bg-bg focus:text-txt-main focus:transition  
        dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-mid-dk hover:dark:bg-bg-dk dark:hover:text-txt-main-dk focus:dark:bg-bg-dk dark:focus:text-txt-main-dk"
        onClick={() => router.push(`/blogpost/${id}/`)}
      >
        <Image
          width={1000}
          height={400}
          style={gradientStyle}
          className="my-0 rounded-t"
          src={sourceImage}
          alt="Bokeh"
        />
        <div className="ml-auto flex flex-wrap bg-transparent p-2 text-txt-mid dark:text-txt-mid-dk">
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
      {isUserMatch ? (
        <div className="mx-auto my-6 grid w-fit gap-4 rounded text-inherit sm:grid-cols-3">
          {published ? (
            <UnpublishButton postId={id} />
          ) : (
            <PublishButton postId={id} />
          )}
          <EditButton postId={id} />
          <DeleteButton postId={id} />
        </div>
      ) : null}
    </div>
  );
}
