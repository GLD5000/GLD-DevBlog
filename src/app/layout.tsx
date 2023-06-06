import { LoginButton, RegisterButton, LogoutButton, ProfileButton } from '@/components/buttons'
import { User } from '@/components/user'
import { NextAuthProvider } from './AuthProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from "../app/api/auth/[...nextauth]/route";



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "GLD DevBlog",
  description:
    "Catch up on the lates web developer trends and hot takes.",
  keywords:
    "Blog, React, web, coding, developer, HTML, CSS, JavaScript, TypeScript",
  authors: [{ name: "GLD", url: "https://github.com/GLD5000" }],
  manifest: "/manifest.json",
  icons: { icon: "/gldcondensed.ico" },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <div>
    <LoginButton />
    <RegisterButton />
    <LogoutButton />
    <ProfileButton />
    <h1>Server Session</h1>
    <pre>{JSON.stringify(session)}</pre>
    <User />
  </div>
        {children}

        </NextAuthProvider>

        </body>
    </html>
  )
}
