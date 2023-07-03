import prisma from "@/lib/prisma";
import { PostProps } from "@/components/BlogPost";
import BlogPostList from "@/components/BlogPostList";
export const revalidate = 86400;

const getData = async (): Promise<{
  props: PostProps[];
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
  };
};

export default async function Page() {
  const data = await getData();
  return (
    <section className="prose mx-auto py-10 dark:prose-invert">
      <div className="mx-auto grid gap-8  py-8">
        <h1 className="mx-auto text-txt-main dark:text-txt-main-dk">
          Latest Blogs
        </h1>
        {data.props.length === 0 ? (
          <div className="mx-auto text-txt-main dark:text-txt-main-dk">
            Why not log in and write your own?
          </div>
        ) : null}
      </div>

      <BlogPostList arrayIn={data.props} />
    </section>
  );
}
