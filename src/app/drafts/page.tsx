import { PostProps } from "@/components/BlogPost";
import { Session, getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import BlogPostList from "@/components/BlogPostList";
import FilterTags from "../FilterTags";

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
        select: { name: true, email: true },
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
        select: { name: true, email: true },
      },
    },
  });

  return {
    published,
    drafts,
  };
};

const Drafts = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="prose mx-auto grid gap-8 py-8 dark:prose-invert">
        <h1 className="mx-auto text-txt-main dark:text-txt-main-dk">
          My Blogs
        </h1>
        <div className="mx-auto text-txt-main dark:text-txt-main-dk">
          You need to be authenticated to view this page.
        </div>
      </div>
    );
  }
  const { drafts, published } = await getData(session);

  return (
    <div className="prose mx-auto w-body-sm min-w-body max-w-body-sm p-2 pb-10 dark:prose-invert sm:w-body sm:max-w-body">
      <h1 className="mx-auto my-8 w-fit font-bold text-txt-main dark:text-txt-main-dk sm:text-7xl">
        My Blogs
      </h1>

      <div className="flex flex-row flex-wrap gap-2 rounded border-2 border-transparent bg-bg-var px-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk ">
        {/* {tagButtons} */}
        <FilterTags />
      </div>
      {published.length ? (
        <>
          <h2 className="mx-auto my-6 w-fit text-txt-main dark:text-txt-main-dk sm:text-5xl">
            Published
          </h2>
          <BlogPostList arrayIn={...published} />
        </>
      ) : (
        <h2 className="mx-auto my-6 w-fit text-txt-main dark:text-txt-main-dk sm:text-5xl">
          No Published Blogs Yet
        </h2>
      )}

      {drafts.length ? (
        <>
          <h2 className="mx-auto my-6 w-fit text-txt-main dark:text-txt-main-dk sm:text-5xl">
            Drafts
          </h2>
          <BlogPostList arrayIn={...drafts} />
        </>
      ) : (
        <h2 className="mx-auto my-6 w-fit text-txt-main dark:text-txt-main-dk sm:text-5xl">
          No Drafts Yet
        </h2>
      )}
    </div>
  );
};

export default Drafts;
