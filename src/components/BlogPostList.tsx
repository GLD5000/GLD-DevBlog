import BlogPost, { PostProps } from "./BlogPost";

export default function BlogPostList({arrayIn}:{arrayIn: PostProps[]}) {
  return (
    <section className="flex w-full mx-auto gap-2 flex-col">
    {arrayIn.map((post: PostProps) => (
        <BlogPost key={post.id} post={post} />
    ))}
  </section>
  )
}