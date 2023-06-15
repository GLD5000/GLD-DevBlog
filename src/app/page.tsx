import prisma from "@/lib/prisma";
import BlogPost, { PostProps } from "@/components/BlogPost";
import BlogPostList from "@/components/BlogPostList";
import { Session } from "next-auth";

const getData = async (): Promise<{
  props: PostProps[];
  revalidate: number;
}> => {
  const drafts: PostProps[] = await prisma.post.findMany({
    where: {
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
    props: drafts,
    revalidate: 10,
  };
};

export default async function Page() {
  const data = await getData();
  return (
    <section className="py-10">
      <div className="grid gap-8 py-8 prose dark:prose-invert mx-auto">
        <h1 className="text-black dark:text-white mx-auto">Latest Blogs</h1>
        <div className="text-black dark:text-white mx-auto">
          Why not log in and write your own?
        </div>
      </div>

      <BlogPostList arrayIn={...data.props} />
    </section>
  );
}
