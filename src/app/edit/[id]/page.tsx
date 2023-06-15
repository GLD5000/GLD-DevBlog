import InputForm from "@/components/InputForm";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Tag } from "@prisma/client";
import { DefaultSession, getServerSession } from "next-auth";

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
    next: { revalidate: 10 },
  };
};

function extractTagNames(tagArray: { tag: Tag | null }[]) {
  return tagArray
    .map((tagObject) => {
      if (!!tagObject.tag) return tagObject.tag.name;
      return "";
    })
    .filter((x) => x !== "");
}

export default async function Edit({ params }: { params: { id: string } }) {
  const {
    props: { feed: post },
  } = await getData(params.id);
  const session: DefaultSession | null = await getServerSession(authOptions);
  const isCorrectUser = session?.user?.email === post?.author?.email;
  if (!isCorrectUser)
    return (
      <div className="grid gap-8 py-8 prose dark:prose-invert mx-auto">
        <h1 className="text-black dark:text-white mx-auto">Edit Blog</h1>
        <div className="text-black dark:text-white mx-auto">
          You need to be authenticated to view this page.
        </div>
      </div>
    );

  const tagNames = !!post?.tags ? extractTagNames(post?.tags) : null;

  return (
    <div>
      <InputForm
        initialContent={post?.content}
        initialTags={tagNames}
        initialTitle={post?.title}
      />
    </div>
  );
}
