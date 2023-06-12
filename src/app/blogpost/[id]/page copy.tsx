// 'use client';

// import { PostProps } from "@/components/BlogPost";
// import { PrismaClient } from "@prisma/client";
// import { title } from "process";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DefaultSession, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
// import PublishButton from "@/components/publishButton";


const getData = async (idIn: string) => {
  const feed = await prisma.post.findFirst({
    where: { id: idIn },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  
  return {
    props: { feed },
  };
};

// async function getData(postId:string){
//   const result = await fetch(`/api/getid/`, {
//     method: "GET",
//     body: postId,
//   });
// console.log('result:', result);

// return result.json();
// }

export default async function Page({ params }: { params: { id: string } }) {
  const {
    props: { feed: post },
  } = await getData(params.id);
const id = params.id;
console.log('helloe')
// const post = await getData(id);
// console.log('post:', post);
  const session: DefaultSession | null = await getServerSession(authOptions);
// console.log('session:', JSON.stringify(session));
const isPublished = post?.published;
const isCorrectUser = session?.user?.email === post?.author?.email;


  return (
    <div className="prose dark:prose-invert">
      fufuidfiufgduidfgbuidgfuibdgibu
      {/* <h2>{post?.title ? post.title : `no title`}</h2>
      <p>By {post?.author?.name ? `${post.author.name}` : `Unknown author`}</p>
      {post?.content ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      ) : null} */}
      {/* {isPublished === false && isCorrectUser === true? <PublishButton postId={params.id}/> : null} */}
      {/* {isCorrectUser === true? <button>Delete</button>: null} */}
    </div>
  );
}
