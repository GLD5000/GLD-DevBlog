import InputForm from "@/components/InputForm";
import { getBlog } from "@/lib/prismaFetch";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { DefaultSession, getServerSession } from "next-auth";

export default async function Edit({ params }: { params: { id: string } }) {
  const { post, tagNames } = await getBlog(params.id);
  const session: DefaultSession | null = await getServerSession(authOptions);
  const isCorrectUser = session?.user?.email === post?.author?.email;
  if (!isCorrectUser)
    return (
      <div className="prose mx-auto grid gap-8 py-8 dark:prose-invert">
        <h1 className="mx-auto text-txt-main dark:text-txt-main-dk">
          Edit Blog
        </h1>
        <div className="mx-auto text-txt-main dark:text-txt-main-dk">
          You need to be authenticated to view this page.
        </div>
      </div>
    );

  return (
    <div>
      <InputForm
        initialContent={post?.content || undefined}
        initialTags={tagNames || undefined}
        initialTitle={post?.title}
        intialId={post?.id}
      />
    </div>
  );
}
