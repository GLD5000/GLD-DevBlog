import BlogPost, { PostProps } from "./BlogPost";

export default function BlogPostList({ arrayIn }: { arrayIn: PostProps[] }) {
  return (
    <section className="mx-auto flex w-full flex-col gap-6">
      {arrayIn.map((post: PostProps) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </section>
  );
}
