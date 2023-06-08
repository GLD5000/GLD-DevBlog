"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import MoonSvg from "@/assets/icons/MoonSvg";
import SunSvg from "@/assets/icons/SunSvg";
import SvgButtonNew from "@/assets/elements/SvgButtonNew";

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
      <div className="my-auto aspect-square h-6 text-inherit">
        {isDark ? <SunSvg /> : <MoonSvg />}{" "}
      </div>
    );
    return wrapper;
  }

  let left = (
    <div className="left">
      <Link
        href="/"
        className={`text-center h-10 my-auto w-28 hover:transition ${
          colourTheme
            ? "rounded border-2 border-white p-1 hover:text-black hover:bg-white"
            : "rounded border-2 border-black text-black p-1 hover:text-white hover:bg-black"
        }`}
      >
        Feed
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link
          href="/"
          className={`text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition ${
            colourTheme
              ? "rounded border-2 border-white p-1 hover:text-black hover:bg-white"
              : "rounded border-2 border-black text-black p-1 hover:text-white hover:bg-black"
          }`}
        >
          Feed
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">Log in</Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="p-2 flex gap-2">
        <Link
          href="/"
          className={`text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition ${
            colourTheme
              ? "rounded border-2 border-white p-1 hover:text-black hover:bg-white"
              : "rounded border-2 border-black text-black p-1 hover:text-white hover:bg-black"
          }`}
        >
          Feed
        </Link>
        <Link
          href="/drafts"
          className={`text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition ${
            colourTheme
              ? "rounded border-2 border-white p-1 hover:text-black hover:bg-white"
              : "rounded border-2 border-black text-black p-1 hover:text-white hover:bg-black"
          }`}
        >
          My drafts
        </Link>
      </div>
    );
    right = (
      <div className="p-2 flex gap-2">
        {/* <p>
          {session.user?.name} 
          {' '}({session.user?.email})
        </p> */}
        {session.user?.image ? (
          <img
            className={`rounded-full w-10 h-10 my-auto ${
              colourTheme ? "border-2 border-white " : "border-2 border-black"
            }`}
            src={session.user.image}
            height={40}
            width={40}
            alt={"User image"}
          />
        ) : null}
        <Link
          href="/create"
          className={`text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition ${
            colourTheme
              ? "rounded border-2 border-white p-1 hover:text-black hover:bg-white"
              : "rounded border-2 border-black text-black p-1 hover:text-white hover:bg-black"
          }`}
        >
          New post
        </Link>
        <button
          className={`text-center h-10 my-auto w-28 hover:transition ${
            colourTheme
              ? "rounded border-2 border-white p-1 hover:text-black hover:bg-white"
              : "rounded border-2 border-black text-black p-1 hover:text-white hover:bg-black"
          }`}
          onClick={() => signOut()}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav
      className={`text-white flex flex-row justify-between p-2 h-fit text-base leading-relaxed`}
    >
      {left}
      <SvgButtonNew
        showTextIn={undefined}
        clickFunction={toggleColourTheme}
        reverse={false}
        id="colour-theme-button"
        name="Dark Mode Button"
        className="relative rounded text-xs"
        buttonClasses="w-fit h-fit overflow-visible flex-col flex text-txt-mid hover:text-txt-main hover:transition focus:text-txt-main  focus:transition dark:text-txt-mid-dk dark:hover:text-txt-main-dk dark:focus:text-txt-main-dk pb-4 pt-1 mt-3 px-2"
        textElement={
          <span className="absolute bottom-0 w-full rounded-t-none bg-transparent text-inherit ">
            {colourTheme ? "Light" : "Dark"}
          </span>
        }
        svg={getDarkToggleIcon(colourTheme)}
      />
      {right}
    </nav>
  );
};

export default Header;
