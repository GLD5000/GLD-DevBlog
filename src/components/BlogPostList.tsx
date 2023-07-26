"use client";

import { PostEmailProps } from "@/lib/prisma/prismaFetch";
import { useStore } from "@/store/zustand";
import BlogPost from "./BlogPost";

export default function BlogPostList({
  arrayIn,
}: {
  arrayIn: PostEmailProps[];
}) {
  const { searchTags } = useStore();
  const searchTagsArray = searchTags.split(" ");
  const filteredArray = searchTags
    ? arrayIn.filter((post) =>
        post.tags.some((tag) => searchTagsArray.includes(tag.tag.name))
      )
    : arrayIn;

  return (
    <section className="mx-auto flex w-full flex-col gap-6">
      {filteredArray.map((post: PostEmailProps) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </section>
  );
}
