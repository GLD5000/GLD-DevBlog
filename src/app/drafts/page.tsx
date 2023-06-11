import React from "react";
import BlogPost, {PostProps} from "@/components/BlogPost";
import { Session, getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import BlogPostList from "@/components/BlogPostList";

const getData = async (sessionData: Session):Promise< {props: PostProps[], revalidate: number} >=> {
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

  return {
    props: drafts ,
    revalidate: 10,
  };
};

const Drafts = async () => {
  const session = await getServerSession(authOptions);
  console.log("session:", session);
  if (!session) {
    return (
      <>
        <h1  className="text-black dark:text-white mx-auto">My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }
  const { props } = await getData(session);

  return (
    <>
      <div className="page">
        <h1 className="text-black dark:text-white mx-auto">My Drafts</h1>
        <BlogPostList arrayIn={...props} />
      </div>

    </>
  );
};

export default Drafts;
