"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MoonSvg from "@/assets/icons/MoonSvg";
import SunSvg from "@/assets/icons/SunSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
import GldSvg from "@/assets/icons/GldSvg";
import UserMenu from "./UserMenu";
import WriteSvg from "@/assets/icons/WriteSvg";
import SignInSvg from "@/assets/icons/SignInSvg";

const Header = ({
  toggleColourTheme,
  colourTheme,
}: {
  toggleColourTheme: () => void;
  colourTheme: boolean;
}) => {
  const { data: session, status } = useSession();
  function getDarkToggleIcon(isDark: boolean) {
    const wrapper = (
      <div className="aspect-square h-5 text-inherit">
        {isDark ? <SunSvg /> : <MoonSvg />}{" "}
      </div>
    );
    return wrapper;
  }
  const isLoaded = status !== "loading";

  return (
    <header
      className={`sticky left-0 top-0 z-[999] h-14 w-full border-b-2 ${
        colourTheme ? "border-b-border-dk bg-bg-dk" : "border-b-border bg-bg"
      }`}
    >
      <nav
        className={`mx-auto flex h-14  w-body-sm min-w-body
        max-w-body flex-row items-center justify-between text-base text-txt-main-dk sm:w-body`}
      >
        <Link
          href="/"
          className="my-auto flex h-10 w-32 items-center justify-center gap-2 rounded border-2 border-transparent p-1 text-center text-txt-main  hover:border-txt-main hover:transition dark:text-txt-main-dk  dark:hover:border-txt-main-dk"
        >
          <div className="h-10 w-10">
            <GldSvg />
          </div>
          DevBlog
        </Link>
        <div className="flex h-14 w-fit flex-row items-center gap-2 p-2">
          {session ? (
            <Link
              href="/create"
              className="my-auto hidden h-10 w-24   items-center justify-center rounded p-1 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main xs:flex"
            >
              <div className="aspect-square h-8 p-[0.15rem]">
                <WriteSvg />
              </div>
              Write
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="my-auto  flex h-10  w-24 items-center justify-center rounded p-1 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition  dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main"
            >
              <div className="aspect-square h-8 p-[0.15rem]">
                <SignInSvg />
              </div>
              Log In
            </Link>
          )}
          <UserMenu
            loaded={isLoaded}
            session={session}
            colourTheme={colourTheme}
          />
          <SvgButtonNew
            clickFunction={toggleColourTheme}
            id="colour-theme-button"
            name="Dark Mode Button"
            className="relative flex h-fit w-fit flex-col overflow-visible rounded px-2 py-[0.85rem] text-xs text-txt-main  hover:bg-bg-dk   hover:text-txt-main-dk hover:transition  focus:transition dark:text-txt-main-dk  dark:hover:bg-bg dark:hover:text-txt-main"
            textElement={
              <span className="absolute top-[calc(100%-0.95rem)] w-full rounded-t-none bg-transparent text-inherit ">
                {colourTheme ? "Light" : "Dark"}
              </span>
            }
            svg={getDarkToggleIcon(colourTheme)}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
