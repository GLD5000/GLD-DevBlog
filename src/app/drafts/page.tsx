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
        select: { name: true },
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
        select: { name: true },
      },
    },
  });

  return {
    published: published,
    drafts: drafts,
  };
};

const Drafts = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="grid gap-8 py-8 prose dark:prose-invert mx-auto">
        <h1 className="text-black dark:text-white mx-auto">My Blogs</h1>
        <div className="text-black dark:text-white mx-auto">
          You need to be authenticated to view this page.
        </div>
      </div>
    );
  }
  const { drafts, published } = await getData(session);

  return (
    <div className="grid gap-8 py-8 prose dark:prose-invert mx-auto">
      {!!published.length ? (
        <>
          <h1 className="text-black dark:text-white w-fit mx-auto">
            Published
          </h1>
          <BlogPostList arrayIn={...published} />
        </>
      ) : (
        <h2 className="text-black dark:text-white w-fit mx-auto">
          No Published Blogs Yet
        </h2>
      )}

      {!!drafts.length ? (
        <>
          <h1 className="text-black dark:text-white w-fit mx-auto">Drafts</h1>
          <BlogPostList arrayIn={...drafts} />
        </>
      ) : (
        <h2 className="text-black dark:text-white w-fit mx-auto">
          No Drafts Yet
        </h2>
      )}
    </div>
  );
};

export default Drafts;
