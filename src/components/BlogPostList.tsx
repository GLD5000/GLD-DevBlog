import BlogPost, { PostEmailProps } from "./BlogPost";

export default function BlogPostList({
  arrayIn,
}: {
  arrayIn: PostEmailProps[];
}) {
  return (
    <section className="mx-auto flex w-full flex-col gap-6">
      {arrayIn.map((post: PostEmailProps) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </section>
  );
}
