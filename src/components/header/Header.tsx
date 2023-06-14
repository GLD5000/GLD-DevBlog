"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MoonSvg from "@/assets/icons/MoonSvg";
import SunSvg from "@/assets/icons/SunSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
import GldSvg from "@/assets/icons/GldSvg";
import UserMenu from "./UserMenu";

const Header = ({
  toggleColourTheme,
  colourTheme,
  toggleMenu,
  showHamburger,
}: {
  toggleColourTheme: () => void;
  toggleMenu: () => void;
  colourTheme: boolean;
  showHamburger: boolean;
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
    <header         className={`w-full sticky z-[999] top-0 left-0 h-14 border-b-2 ${
      colourTheme ? "border-b-border-dk bg-bg-dk" : "border-b-border bg-bg"
    }`}
>
      <nav
        className={`mx-auto w-body-sm min-w-body  max-w-body items-center
        sm:w-body text-white flex flex-row justify-between h-14 text-base`}
      >
        <Link
          href="/"
          className={`rounded p-1 flex gap-2 items-center justify-center border-transparent border-2 text-center h-10 my-auto w-32 hover:transition ${
            colourTheme
              ? " hover:border-white text-white  "
              : " hover:border-black text-black  "
          }`}
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
              className={`rounded hidden xs:flex text-center  border-2 items-center justify-center h-10 my-auto w-28 hover:transition ${
                colourTheme
                  ? "  p-1 hover:text-black border-white hover:bg-white"
                  : "  text-black p-1 border-black hover:text-white hover:bg-black"
              }`}
            >
              New post
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className={`rounded  text-center flex border-2 items-center justify-center h-10 my-auto w-28 hover:transition ${
                colourTheme
                  ? "  p-1 hover:text-black border-white hover:bg-white"
                  : "  text-black p-1 border-black hover:text-white hover:bg-black"
              }`}
            >
              Sign In
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
            className="relative rounded text-xs w-fit h-fit overflow-visible flex-col flex text-txt-mid hover:text-txt-main hover:transition focus:text-txt-main  focus:transition dark:text-txt-mid-dk dark:hover:text-txt-main-dk dark:focus:text-txt-main-dk px-2 py-[0.75rem]"
            textElement={
              <span className="absolute top-[calc(100%-0.85rem)] w-full rounded-t-none bg-transparent text-inherit ">
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
