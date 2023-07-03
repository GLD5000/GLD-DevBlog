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
  let title = post!.title;
  let subtitle = undefined;
  const hasSubtitle = title.includes(":");
  if (hasSubtitle) {
    [title, subtitle] = title.split(":");
  }
  const author = post!.author!.name;
  const readTime = post!.readTime;
  const content = post!.content;
  const updatedAt = post!.updatedAt;
  const tags = post!.tags;
  const gradientStyle = getGradient(tags);
  const sourceImage = "/Bokeh.svg";
  if (!post) return <p>Uh oh! Blog post not found!</p>;

  return (
    <div className="grid w-full text-txt-main dark:text-txt-main-dk">
      {isCorrectUser ? (
        <div className="mx-auto my-8 flex w-fit flex-row flex-wrap items-center gap-6 rounded-xl bg-bg-var text-inherit shadow-lg dark:bg-bg-var-dk dark:drop-shadow-post-dk">
          <div className="mx-auto grid">
            <h2 className="mx-auto w-fit text-2xl font-bold text-inherit">{`Hi ${author}!`}</h2>
            <p className="mx-auto w-fit text-base text-inherit">Publish, Edit or Delete your post here...</p>
          </div>
          <div className="mx-auto grid w-fit gap-4 rounded text-inherit sm:grid-cols-3">
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
      <div className="mb-20 mt-6 rounded-xl bg-bg-var shadow-lg dark:bg-bg-var-dk dark:drop-shadow-post-dk ">
        <Image
          width={1000}
          height={400}
          style={gradientStyle}
          className="my-0 rounded-t-xl bg-gray-500"
          src={sourceImage}
          alt={"Tech Image"}
        />
        <div className="mx-auto p-4">
          {hasSubtitle ? (
            <>
              <h1 className="mx-auto my-4 w-fit break-words text-center text-6xl font-bold text-txt-main dark:text-txt-main-dk">
                {title ? `${title}` : `no title`}
              </h1>
              <h2 className="mx-auto my-4 w-fit break-words text-center text-4xl font-bold text-txt-main dark:text-txt-main-dk">
                {subtitle ? subtitle : ``}
              </h2>
            </>
          ) : (
            <h1 className="mx-auto my-4 w-fit break-words text-center text-6xl font-bold text-txt-main dark:text-txt-main-dk">
              {title ? title : `no title`}
            </h1>
          )}

          {!!tags.length && !!tags ? <TagSet tagsObject={tags} /> : null}
          <p className="mx-auto block w-fit">
            {updatedAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
          </p>
          <p className="mx-auto block w-fit font-bold">
            Written by {author ? `${author}` : `Unknown author`}
          </p>
          <p className="mx-auto block w-fit p-2">{`${readTime} min read`}</p>
        </div>
        {content ? (
          <ReactMarkdown
            className="prose mx-auto mb-20 w-full px-4 dark:prose-invert sm:prose-lg lg:prose-xl xl:prose-2xl  "
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        ) : null}
      </div>
    </div>
  );
}
