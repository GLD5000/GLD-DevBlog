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
    <div className="w-full grid text-black dark:text-white">
        <h1 className="mx-auto my-6 w-fit text-6xl font-bold">{post.title ? post.title : `no title`}</h1>
        {!!post.tags.length && !!post.tags? <TagSet tagsObject={...post.tags}/>: null}
        <small className="mx-auto">{post.updatedAt.toLocaleDateString("en-GB", {dateStyle:'long'})}</small>
        <small className="font-bold block mx-auto">Written by {post.author?.name ? `${post.author.name}` : `Unknown author`}</small>
        {post.content ? (
          <ReactMarkdown className="my-6 prose dark:prose-invert sm:prose-lg lg:prose-xl xl:prose-2xl mx-auto  " remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        ) : null}
     {  isCorrectUser?   <div className="grid grid-cols-3 gap-4 mx-auto w-fit">
       {!isPublished ? <PublishButton postId={params.id} />: <UnpublishButton postId={params.id}/>}
        <EditButton postId={params.id} />
        <DeleteButton postId={params.id} />
        </div>: null}
      </div>
  );
}
