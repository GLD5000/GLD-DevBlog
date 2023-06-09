"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import MoonSvg from "@/assets/icons/MoonSvg";
import SunSvg from "@/assets/icons/SunSvg";
import SvgButtonNew from "@/assets/elements/SvgButtonNew";
import useDropdownMenu, {
  ButtonProps,
} from "react-accessible-dropdown-menu-hook";
import GldSvg from "@/assets/icons/GldSvg";
import { Session } from "next-auth";
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
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(3);
  const { data: session, status } = useSession();
  function getDarkToggleIcon(isDark: boolean) {
    const wrapper = (
      <div className="aspect-square h-6 text-inherit">
        {isDark ? <SunSvg /> : <MoonSvg />}{" "}
      </div>
    );
    return wrapper;
  }
  const isLoaded = status !== "loading";

  return (
    <nav
      className={`text-white flex flex-row justify-between h-14 text-base leading-relaxed border-b-2 ${
        colourTheme ? "border-b-border" : "border-b-border-dk"
      }`}
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
        <Link
          href="/create"
          className={`rounded  text-center flex border-2 items-center justify-center h-10 my-auto w-28 hover:transition ${
            colourTheme
              ? "  p-1 hover:text-black border-white hover:bg-white"
              : "  text-black p-1 border-black hover:text-white hover:bg-black"
          }`}
        >
          New post
        </Link>
        <UserMenu
          loaded={isLoaded}
          session={session}
          colourTheme={colourTheme}
        />

        <SvgButtonNew
          showTextIn={undefined}
          clickFunction={toggleColourTheme}
          reverse={false}
          id="colour-theme-button"
          name="Dark Mode Button"
          className="relative rounded text-xs"
          buttonClasses="w-fit h-fit overflow-visible flex-col flex text-txt-mid hover:text-txt-main hover:transition focus:text-txt-main  focus:transition dark:text-txt-mid-dk dark:hover:text-txt-main-dk dark:focus:text-txt-main-dk p-2"
          textElement={
            <span className="absolute top-[calc(100%-0.65rem)] w-full rounded-t-none bg-transparent text-inherit ">
              {colourTheme ? "Light" : "Dark"}
            </span>
          }
          svg={getDarkToggleIcon(colourTheme)}
        />
      </div>
    </nav>
  );
};

export default Header;
