import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
    ],
    // callbacks: {
    //   async jwt({ token }) {
    //     token.userRole = "admin"
    //     return token
    //   },
  
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
  };
  
  export default authOptions;