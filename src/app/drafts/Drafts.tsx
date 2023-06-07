'use client';

import BlogPost, {PostProps} from "@/components/Post";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";



const Drafts = async (dataFetch: (sessionIn: Session | null) => Promise<{
    props: {
        drafts: PostProps[];
    };}>) => {
        const {data: session, status} = useSession();
        const { props } = await dataFetch(session);
  
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
  