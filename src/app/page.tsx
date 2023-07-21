import { Fredericka_the_Great as FredTheGreat } from "next/font/google";
import BlogPostList from "@/components/BlogPostList";
import getBlogs from "@/lib/prismaFetch";
import { useStore } from "@/store/zustand";
import ZustandInitialiser from "@/store/ZustandInitialiser";
import FilterTags from "./FilterTags";

const theGreat = FredTheGreat({ weight: "400", subsets: ["latin"] });

export const revalidate = 86400;

export default async function Page() {
  // console.log('>>>>>>>>>>>>>>>>>>>>searchTags:', searchTags);
  const { tags, posts } = await getBlogs();
  useStore.setState({ allTags: tags });
  // console.log('useStore.getState().allTags:', useStore.getState().allTags);
  // console.log('tags:', tags);
  return (
    <section className="prose mx-auto w-body-sm min-w-body max-w-body-sm p-2 pb-10 dark:prose-invert sm:w-body sm:max-w-body">
      <ZustandInitialiser searchTags="" allTags={useStore.getState().allTags} />
      <h1
        className={`mx-auto mb-0 mt-8 w-fit text-6xl text-current xs:text-8xl ${theGreat.className}`}
      >
        DevBlog
      </h1>
      <h2 className={`mx-auto my-2 w-fit text-xl text-current sm:text-2xl `}>
        Find Your Story Here
      </h2>
      <div className="mx-auto grid gap-8  py-8">
        <div className="flex flex-row flex-wrap gap-2 rounded border-2 border-transparent bg-bg-var px-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk ">
          {/* {tagButtons} */}
          <FilterTags />
        </div>

        {posts.length === 0 ? (
          <div className="mx-auto text-txt-main dark:text-txt-main-dk">
            Why not log in and write your own?
          </div>
        ) : null}
      </div>

      <BlogPostList arrayIn={posts} />
    </section>
  );
}
