import prisma from "@/lib/prisma";
import BlogPost, { PostProps } from "@/components/BlogPost";
import BlogPostList from "@/components/BlogPostList";
import { Session } from "next-auth";

const getData = async ():Promise< {props: PostProps[], revalidate: number} >=> {
  const drafts: PostProps[] = await prisma.post.findMany({
    where: {
      published: true ,
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

export default async function Page() {
  const data = await getData();
  return (
    <section className="page">
      {/* <h1 >Public Feed</h1> */}
      {/* <main> */}
      <BlogPostList arrayIn={...data.props}/>
      {/* </main> */}
    </section>
  );
}
