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
  };
}

function extractTagNames(tagArray: { tag: Tag | null }[]) {
  const newArray: [string, string][] = tagArray
  .map((tagObject):[string, string] => {
    if (!!tagObject.tag) return [tagObject.tag.name as string, tagObject.tag.backgroundColour as string];
    return ["",""];
  })
  .filter((x) => x.join().length !== 0);
  const returnMap: Map<string,string> =  new Map(newArray);
  return returnMap;
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
        <h1 className="text-txt-main dark:text-txt-main-dk mx-auto">
          Edit Blog
        </h1>
        <div className="text-txt-main dark:text-txt-main-dk mx-auto">
          You need to be authenticated to view this page.
        </div>
      </div>
    );

  const tagNames = !!post?.tags ? extractTagNames(post?.tags) : null;
  return (
    <div>
      <InputForm
        initialContent={post?.content|| undefined}
        initialTags={tagNames || undefined}
        initialTitle={post?.title}
        intialId={post?.id}
      />
    </div>
  );
}
