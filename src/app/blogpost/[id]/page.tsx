import prisma from "@/lib/prisma";
import PublishButton from "@/components/publishButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DefaultSession, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import DeleteButton from "@/components/DeleteButton";
import UnpublishButton from "@/components/UnpublishButton";

const getData = async (idIn: string) => {
  const feed = await prisma.post.findFirst({
    where: { id: idIn },
    include: {
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

  return (
    <div className="prose dark:prose-invert">
      <h2>{post?.title ? post.title : `no title`}</h2>
      <p>By {post?.author?.name ? `${post.author.name}` : `Unknown author`}</p>
      {post?.content ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      ) : null}
     {!isPublished && isCorrectUser? <PublishButton postId={params.id} />: <UnpublishButton postId={params.id}/>}
     {isCorrectUser? <DeleteButton postId={params.id} />: null}
    </div>
  );
}
