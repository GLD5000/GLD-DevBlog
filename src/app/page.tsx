import prisma from "@/lib/prisma";
import { PostEmailProps } from "@/components/BlogPost";
import BlogPostList from "@/components/BlogPostList";
// import { useStore } from "@/store/zustand";
import FilterTags from "./FilterTags";
// import ZustandInitialiser from "@/store/ZustandInitialiser";

export const revalidate = 86400;

const getData = async (): Promise<{
  props: PostEmailProps[];
}> => {
  const drafts: PostEmailProps[] = await prisma.post.findMany({
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
  // if (searchTags) {
  //   const searchTagsArray = searchTags.split(" ");
  //   return {
  //     props: drafts.filter((post) =>
  //       post.tags.some((tag) => searchTagsArray.includes(tag.tag.name))
  //     ),
  //   };
  // }
  return {
    props: drafts,
  };
};

export default async function Page() {
  // const searchTags = useStore.getState().searchTags;
  // console.log('>>>>>>>>>>>>>>>>>>>>searchTags:', searchTags);
  const data = await getData();
  return (
    <section className="prose mx-auto py-10 dark:prose-invert">
      {/* <ZustandInitialiser searchTags={useStore.getState().searchTags} /> */}
      <div className="mx-auto grid gap-8  py-8">
        <h1 className="mx-auto text-txt-main dark:text-txt-main-dk">
          Latest Blogs
        </h1>
        <div className="flex flex-row flex-wrap gap-2 rounded border-2 border-transparent bg-bg-var px-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk ">
          {/* {tagButtons} */}
          <FilterTags />
        </div>

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
