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
import { Tag } from "@prisma/client";
import getGradient from "@/utilities/colour/getGradient";

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
  const userId = params.id;
  const {
    props: { feed: post },
  } = await getData(userId);
  const session: DefaultSession | null = await getServerSession(authOptions);
  const isPublished = post?.published;
  const isCorrectUser = session?.user?.email === post?.author?.email;
  const title = post!.title;
  const author = post!.author!.name;
  const readTime = post!.readTime;
  const content = post!.content;
  const updatedAt = post!.updatedAt;
  const tags = post!.tags;
  const gradientStyle = getGradient(tags);
  const sourceImage = "/Bokeh.svg";
  if (!post) return <p>Uh oh! Blog post not found!</p>;

  return (
    <div className="w-full grid text-txt-main dark:text-txt-main-dk">
      {isCorrectUser ? (
        <div className="flex flex-row flex-wrap items-center w-fit mx-auto rounded-xl shadow-lg dark:drop-shadow-post-dk text-inherit bg-bg-var dark:bg-bg-var-dk my-8 gap-6">
          <div className="grid mx-auto">
            <h2 className="mx-auto w-fit text-2xl font-bold text-inherit">{`Hi ${author}!`}</h2>
            <p className="mx-auto w-fit text-base text-inherit">{`Publish, Edit or Delete your post here...`}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 rounded mx-auto w-fit text-inherit">
            {!isPublished ? (
              <PublishButton postId={userId} />
            ) : (
              <UnpublishButton postId={userId} />
            )}
            <EditButton postId={userId} />
            <DeleteButton postId={userId} />
          </div>
        </div>
      ) : null}
      <div className="bg-bg-var dark:bg-bg-var-dk rounded-xl shadow-lg dark:drop-shadow-post-dk mt-6 mb-20 ">
        <Image
          width={1000}
          height={400}
          style={gradientStyle}
          className="my-0 rounded-t-xl bg-gray-500"
          src={sourceImage}
          alt={"Tech Image"}
        />
        <div className="p-4 mx-auto">
          <h1 className="mx-auto my-6 w-fit text-6xl font-bold text-center">
            {title ? title : `no title`}
          </h1>
          {!!tags.length && !!tags ? <TagSet tagsObject={tags} /> : null}
          <p className="mx-auto w-fit block">
            {updatedAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
          </p>
          <p className="font-bold block w-fit mx-auto">
            Written by {author ? `${author}` : `Unknown author`}
          </p>
          <p className="p-2 w-fit block mx-auto">
            {`${readTime} min read`}
          </p>
        </div>
        {content ? (
          <ReactMarkdown
            className="mb-20 px-4 w-full prose dark:prose-invert sm:prose-lg lg:prose-xl xl:prose-2xl mx-auto  "
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        ) : null}
      </div>
    </div>
  );
}
