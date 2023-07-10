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
import getGradient from "@/utilities/colour/getGradient";
import { PostProps, getBlog } from "@/lib/prismaFetch";

export default async function Page({ params }: { params: { id: string } }) {
  const postId = params.id;
  const { post } = await getBlog(postId);
  const session: DefaultSession | null = await getServerSession(authOptions);
  const isPublished = post?.published;
  const isCorrectUser = session?.user?.email === post?.author?.email;
  let { title } = post as PostProps;
  let subtitle = "";
  const hasSubtitle = title.includes(":");
  if (hasSubtitle) {
    [title, subtitle] = title.split(":");
  }
  const author = post?.author?.name;
  const { readTime, content, createdAt, tags } = post as PostProps;
  const gradientStyle = getGradient(tags);
  const sourceImage = "/Bokeh.svg";
  if (!post) return <p>Uh oh! Blog post not found!</p>;

  return (
    <div className="grid w-full text-txt-main dark:text-txt-main-dk">
      <div className="mx-auto w-body-sm min-w-body max-w-body sm:w-body-sm">
        {isCorrectUser ? (
          <div className="mx-auto my-8 flex w-fit flex-row flex-wrap items-center gap-6 rounded-xl bg-bg-var p-4 text-inherit shadow-lg dark:bg-bg-var-dk dark:drop-shadow-post-dk">
            <div className="mx-auto grid">
              <h2 className="mx-auto w-fit text-2xl font-bold text-inherit">{`Hi ${author}!`}</h2>
              <p className="mx-auto w-fit break-words text-base text-inherit">
                Publish, Edit or Delete your post here...
              </p>
            </div>
            <div className="mx-auto grid w-fit gap-4  rounded text-inherit sm:grid-cols-3">
              {!isPublished ? (
                <PublishButton postId={postId} />
              ) : (
                <UnpublishButton postId={postId} />
              )}
              <EditButton postId={postId} />
              <DeleteButton postId={postId} />
            </div>
          </div>
        ) : null}
        <div className="mb-20 mt-6 w-full rounded-xl bg-bg-var shadow-lg dark:bg-bg-var-dk dark:drop-shadow-post-dk ">
          <Image
            width={1000}
            height={400}
            style={gradientStyle}
            className="my-0 w-full rounded-t-xl bg-gray-500"
            src={sourceImage}
            alt="Bokeh"
          />
          <div className="mx-auto w-fit p-4">
            {hasSubtitle ? (
              <>
                <h1 className="mx-auto my-4 w-fit break-words text-center text-3xl font-bold text-txt-main dark:text-txt-main-dk xs:text-5xl sm:text-6xl">
                  {title || `no title`}
                </h1>
                <h2 className="mx-auto my-4 w-fit break-words text-center text-xl font-bold text-txt-main dark:text-txt-main-dk xs:text-3xl sm:text-4xl">
                  {subtitle || ``}
                </h2>
              </>
            ) : (
              <h1 className="mx-auto my-4 w-fit break-words text-center text-3xl font-bold text-txt-main dark:text-txt-main-dk xs:text-5xl sm:text-6xl">
                {title || `no title`}
              </h1>
            )}

            {tags.length && tags ? <TagSet tagsObject={tags} /> : null}
            <p className="mx-auto block w-fit">
              {createdAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
            </p>
            <p className="mx-auto block w-fit font-bold">
              Written by {author ? `${author}` : `Unknown author`}
            </p>
            <p className="mx-auto block w-fit p-2">{`${readTime} min read`}</p>
          </div>
          {content ? (
            <ReactMarkdown
              className="prose prose-sm mx-auto w-body-sm p-4 dark:prose-invert xs:prose-base sm:prose-lg lg:prose-xl xl:prose-2xl xs:w-body  "
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          ) : null}
        </div>
      </div>
    </div>
  );
}
