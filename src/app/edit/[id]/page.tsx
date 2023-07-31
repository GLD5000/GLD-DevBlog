import InputForm from "@/components/InputForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { DefaultSession, getServerSession } from "next-auth";

export default async function Edit() {
  const session: DefaultSession | null = await getServerSession(authOptions);

  if (!session?.user)
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
      <InputForm />
    </div>
  );
}
