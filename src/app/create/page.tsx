import InputForm from "@/components/InputForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { DefaultSession, getServerSession } from "next-auth";

export default async function Create() {
  const session: DefaultSession | null = await getServerSession(authOptions);
  const isCorrectUser = !!session;
  if (!isCorrectUser)
    return (
      <div className="grid gap-8 py-8 prose dark:prose-invert mx-auto">
        <h1 className="text-txt-main dark:text-txt-main-dk mx-auto">
          New Post
        </h1>
        <div className="text-txt-main dark:text-txt-main-dk mx-auto">
          You need to be authenticated to view this page.
        </div>
      </div>
    );

  return (
    <div>
      <InputForm />
    </div>
  );
}
