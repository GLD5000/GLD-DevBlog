import InputForm from "@/components/InputForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { DefaultSession, getServerSession } from "next-auth";

export default async function Create() {

  const session: DefaultSession | null = await getServerSession(authOptions);
  const isCorrectUser = !!session;
  if (!isCorrectUser) return <h1 className="text-black dark:text-white text-2xl my-10 mx-auto w-fit h-fit font-bold">Sorry, you are not authorised to post!</h1>;

  return (
    <div>
      <InputForm/>
    </div>
  );
};

