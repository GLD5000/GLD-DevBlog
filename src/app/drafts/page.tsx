import React from "react";
import BlogPost, { PostProps } from "@/components/BlogPost";
import { Session, getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import BlogPostList from "@/components/BlogPostList";

const getData = async (
  sessionData: Session
): Promise<{
  published: PostProps[];
  drafts: PostProps[];
}> => {
  const drafts: PostProps[] = await prisma.post.findMany({
    where: {
      author: { email: sessionData?.user?.email },
      published: false,
    },
    orderBy: { createdAt: "desc" },
    include: {
      tags: {
        orderBy: { tag: { name: "asc" } },
        select: { tag: true },
      },
      author: {
        select: { name: true, email: true },
      },
    },
  });
  const published: PostProps[] = await prisma.post.findMany({
    where: {
      author: { email: sessionData?.user?.email },
      published: true,
    },
    orderBy: { createdAt: "desc" },
    include: {
      tags: {
        orderBy: { tag: { name: "asc" } },
        select: { tag: true },
      },
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    published,
    drafts,
  };
};

const Drafts = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="prose mx-auto grid gap-8 py-8 dark:prose-invert">
        <h1 className="mx-auto text-txt-main dark:text-txt-main-dk">
          My Blogs
        </h1>
        <div className="mx-auto text-txt-main dark:text-txt-main-dk">
          You need to be authenticated to view this page.
        </div>
      </div>
    );
  }
  const { drafts, published } = await getData(session);

  return (
    <div className="prose mx-auto grid gap-8 py-8 dark:prose-invert">
      {published.length ? (
        <>
          <h1 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
            Published
          </h1>
          <BlogPostList arrayIn={...published} />
        </>
      ) : (
        <h2 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
          No Published Blogs Yet
        </h2>
      )}

      {drafts.length ? (
        <>
          <h1 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
            Drafts
          </h1>
          <BlogPostList arrayIn={...drafts} />
        </>
      ) : (
        <h2 className="mx-auto w-fit text-txt-main dark:text-txt-main-dk">
          No Drafts Yet
        </h2>
      )}
    </div>
  );
};

export default Drafts;
