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
      className={`w-full sticky z-[999] top-0 left-0 h-14 border-b-2 ${
        colourTheme ? "border-b-border-dk bg-bg-dk" : "border-b-border bg-bg"
      }`}
    >
      <nav
        className={`mx-auto w-body-sm min-w-body  max-w-body items-center
        sm:w-body text-white flex flex-row justify-between h-14 text-base`}
      >
        <Link
          href="/"
          className="rounded p-1 flex gap-2 items-center justify-center border-transparent border-2 text-center h-10 my-auto w-32 hover:transition  hover:border-black dark:text-white dark:hover:border-white  text-black"
        >
          <div className="h-10 w-10">
            <GldSvg />
          </div>
          DevBlog
        </Link>
        <div className="flex flex-row gap-2 p-2 items-center h-14 w-fit">
          {session ? (
            <Link
              href="/create"
              className="rounded hidden xs:flex text-center   items-center justify-center h-10 my-auto w-24 hover:transition dark:hover:text-black dark:hover:bg-white text-black dark:text-white p-1 hover:text-white hover:bg-black"
            >
              <div className="h-8 p-[0.15rem] aspect-square">
                <WriteSvg />
              </div>
              Write
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="rounded  text-center flex  items-center justify-center h-10 my-auto w-24 p-1 hover:transition dark:hover:text-black dark:hover:bg-white text-black  hover:text-white hover:bg-black dark:text-white"
            >
              <div className="h-8 p-[0.15rem] aspect-square">
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
            className="relative rounded text-xs w-fit h-fit overflow-visible flex-col flex text-black hover:text-white hover:transition  hover:bg-black   focus:transition dark:hover:bg-white  dark:text-white dark:hover:text-black  px-2 py-[0.85rem]"
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
