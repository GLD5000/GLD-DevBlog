import prisma from "@/lib/prisma";
import PublishButton from "@/components/publishButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DefaultSession, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import DeleteButton from "@/components/DeleteButton";
import UnpublishButton from "@/components/UnpublishButton";
import TagSet from "@/components/TagSet";

const getData = async (idIn: string) => {
  const feed = await prisma.post.findFirst({
    where: { id: idIn },
    include: {
      tags: {select:{tag:true}},
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: { feed },
    next: {revalidate:10}
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

  if (!post) return <p>Uh oh! Blog post not found!</p>

  return (
    <div className="w-full flex">
      <div className="prose dark:prose-invert sm:prose-lg lg:prose-xl xl:prose-2xl mx-auto">
        <h2 className="mx-auto w-fit">{post.title ? post.title : `no title`}</h2>
        {!!post.tags.length && !!post.tags? <TagSet tagsObject={...post.tags}/>: null}
        <small>{post.updatedAt.toLocaleDateString("en-GB", {dateStyle:'long'})}</small>
        <small className="font-bold block">By {post.author?.name ? `${post.author.name}` : `Unknown author`}</small>
        {post.content ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        ) : null}
          <div className="grid gap-4 mx-auto w-fit">
       {!isPublished && isCorrectUser? <PublishButton postId={params.id} />: <UnpublishButton postId={params.id}/>}
       {isCorrectUser? <DeleteButton postId={params.id} />: null}
        </div>
      </div>
    </div>
  );
}
