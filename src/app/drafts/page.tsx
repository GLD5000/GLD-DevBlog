"use client";

import React, { useEffect, useState } from "react";
import { PostProps } from "@/components/BlogPost";
import { useSession } from "next-auth/react";
import BlogPostList from "@/components/BlogPostList";

const Drafts = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<{
    drafts: PostProps[];
    published: PostProps[];
  }>();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `/api/get?authorEmail=${session!.user!.email}`
        );
        const data = await response.json();
        setData(data);
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
      <h1 className="text-txt-main dark:text-txt-main-dk w-fit mx-auto">
        You need to be authenticated to view this page.
      </h1>
    );

  return (
    <div className="grid gap-8 py-8 prose dark:prose-invert mx-auto">
      {data?.published && data?.published.length > 0 ? (
        <>
          <h1 className="text-txt-main dark:text-txt-main-dk w-fit mx-auto">
            Published
          </h1>
          <BlogPostList arrayIn={data?.published} />
        </>
      ) : (
        <h2 className="text-txt-main dark:text-txt-main-dk w-fit mx-auto">
          No Published Blogs Yet
        </h2>
      )}

      {data?.drafts && data?.drafts.length > 0 ? (
        <>
          <h1 className="text-txt-main dark:text-txt-main-dk w-fit mx-auto">
            Drafts
          </h1>
          <BlogPostList arrayIn={data?.drafts} />
        </>
      ) : (
        <h2 className="text-txt-main dark:text-txt-main-dk w-fit mx-auto">
          No Drafts Yet
        </h2>
      )}
    </div>
  );
};

export default Drafts;
