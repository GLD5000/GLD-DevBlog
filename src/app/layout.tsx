import { NextAuthProvider } from "./AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";
// import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GLD DevBlog",
  description: "Catch up on the latest web developer trends and hot takes.",
  keywords:
    "Blog, React, web, coding, developer, HTML, CSS, JavaScript, TypeScript",
  authors: [{ name: "GLD", url: "https://github.com/GLD5000" }],
  manifest: "/manifest.json",
  icons: { icon: "/gldcondensed.ico" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
     {/* <Header/> */}
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
