"use client";

import React, { useEffect, useState } from "react";
import { PostProps } from "@/components/BlogPost";
import { useSession } from "next-auth/react";
import BlogPostList from "@/components/BlogPostList";

export default function Drafts() {
  const { data: session } = useSession();
  const [data, setData] = useState<{
    drafts: PostProps[];
    published: PostProps[];
  }>();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `/api/get?authorEmail=${session?.user?.email}`
        );
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    if (session) {
      getPosts();
    }
  }, [session]);
  if (session === null)
    return (
      <h1 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
        You need to be authenticated to view this page.
      </h1>
    );

  return (
    <div className="prose mx-auto grid gap-8 py-8 dark:prose-invert">
      {data?.published && data?.published.length > 0 ? (
        <>
          <h1 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
            Published
          </h1>
          <BlogPostList arrayIn={data?.published} />
        </>
      ) : (
        <h2 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
          No Published Blogs Yet
        </h2>
      )}

      {data?.drafts && data?.drafts.length > 0 ? (
        <>
          <h1 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
            Drafts
          </h1>
          <BlogPostList arrayIn={data?.drafts} />
        </>
      ) : (
        <h2 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
          No Drafts Yet
        </h2>
      )}
    </div>
  );
}
