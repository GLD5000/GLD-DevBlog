import React from "react";
import { GetServerSideProps } from "next";
import BlogPost from "@/components/Post";
import {  Session, getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getData = async (sessionData: Session) => {

  const drafts = await prisma.post.findMany({
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
    props: { drafts },
    revalidate: 1000,
  };
};

const Drafts = async () => {
  const session  = await getServerSession(authOptions);
console.log('session:', session);
  if (!session) {
    return (
      <>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }
  const { props } = await getData(session);


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
