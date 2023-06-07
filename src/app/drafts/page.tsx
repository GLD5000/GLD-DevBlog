import React from "react";
import { GetServerSideProps } from "next";
import BlogPost from "@/components/Post";
import {  getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getData = async () => {
  const session  = await getServerSession(authOptions);

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session?.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { drafts },
    session,
    revalidate: 10,
  };
};

const Drafts = async () => {
  const { props, session } = await getData();

  if (!session) {
    return (
      <>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }

  return (
    <>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <BlogPost post={post} />
            </div>
          ))}
        </main>
      </div>
      {/* <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style> */}
    </>
  );
};

export default Drafts;
