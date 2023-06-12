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
  next:{revalidate: number};
}> => {
  const drafts: PostProps[] = await prisma.post.findMany({
    where: {
      author: { email: sessionData?.user?.email },
      published: false,
    },
    include: {
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
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    published: published,
    drafts: drafts,
    next: {revalidate: 10},
  };
};

const Drafts = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <>
        <h1 className="text-black dark:text-white mx-auto">My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }
  const { drafts, published } = await getData(session);

  return (
    <>
      <div className="page">
      <h1 className="text-black dark:text-white w-fit mx-auto">Published</h1>
        <BlogPostList arrayIn={...published} />

        <h1 className="text-black dark:text-white w-fit mx-auto">Drafts</h1>
        <BlogPostList arrayIn={...drafts} />
      </div>
    </>
  );
};

export default Drafts;
