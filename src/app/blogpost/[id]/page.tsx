import prisma from "@/lib/prisma";
import PublishButton from "@/components/publishButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DefaultSession, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import DeleteButton from "@/components/DeleteButton";
import UnpublishButton from "@/components/UnpublishButton";
import TagSet from "@/components/TagSet";
import EditButton from "@/components/EditButton";
import Image from "next/image";


const getData = async (idIn: string) => {
  const feed = await prisma.post.findFirst({
    where: { id: idIn },
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
    props: { feed },
  };
};

export default async function Page({ params }: { params: { id: string } }) {
  // console.log("blogpost APPP");
  const {
    props: { feed: post },
  } = await getData(params.id);
  const session: DefaultSession | null = await getServerSession(authOptions);
  const isPublished = post?.published;
  const isCorrectUser = session?.user?.email === post?.author?.email;
  const tagNames = post?.tags
    .map((tag) => {
      if (!!!tag.tag) return null;
      const tagObject = tag.tag;
      return tagObject.name;
    })
    .join(",");
  const sourceImage =
    !Array.isArray(tagNames) || tagNames.length < 3
      ? `https://source.unsplash.com/random/1000x400/?${tagNames},random`
      : `https://source.unsplash.com/random/1000x400/?${tagNames}`;
  if (!post) return <p>Uh oh! Blog post not found!</p>;

  return (
    <div className="w-full grid text-txt-main dark:text-txt-main-dk">
      {isCorrectUser ? (
        <div className="flex flex-row flex-wrap items-center w-fit mx-auto p-4 rounded-xl shadow-lg dark:drop-shadow-post-dk text-inherit bg-bg-var dark:bg-bg-var-dk my-8 gap-6">
          <div className="grid mx-auto">
            <h2 className="mx-auto w-fit text-2xl font-bold text-inherit">{`Hi ${post.author?.name}!`}</h2>
            <p className="mx-auto w-fit text-base text-inherit">{`Publish, Edit or Delete your post here...`}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 rounded mx-auto w-fit text-inherit">
            {!isPublished ? (
              <PublishButton postId={params.id} />
            ) : (
              <UnpublishButton postId={params.id} />
            )}
            <EditButton postId={params.id} />
            <DeleteButton postId={params.id} />
          </div>
        </div>
      ) : null}
      <div className="bg-bg-var dark:bg-bg-var-dk p-4 rounded-xl shadow-lg dark:drop-shadow-post-dk">
          <Image
          width={1000}
          height={400}
          className="my-0 rounded-t"
          src={sourceImage}
          alt={"Tech Image"}
        />
        <h1 className="mx-auto my-4 w-fit text-6xl font-bold text-center">
          {post.title ? post.title : `no title`}
        </h1>
        {!!post.tags.length && !!post.tags ? (
          <TagSet tagsObject={...post.tags} />
        ) : null}
        <small className="mx-auto w-fit block">
          {post.updatedAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
        </small>
        <small className="font-bold block w-fit mx-auto">
          Written by{" "}
          {post.author?.name ? `${post.author.name}` : `Unknown author`}
        </small>
        <small className="p-2 w-fit block mx-auto">
            {`${post.readTime} min read`}
          </small>
        {post.content ? (
          <ReactMarkdown
            className="my-6  w-full prose dark:prose-invert sm:prose-lg lg:prose-xl xl:prose-2xl mx-auto  "
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        ) : null}
      </div>
    </div>
  );
}
