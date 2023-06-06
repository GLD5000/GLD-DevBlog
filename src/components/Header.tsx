import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { User } from "@/components/user";

export default async function Header() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <LoginButton />
      <RegisterButton />
      <LogoutButton />
      <ProfileButton />
      <h1>Server Session</h1>
      <pre>{JSON.stringify(session)}</pre>
      <User />
    </div>
  );
}
