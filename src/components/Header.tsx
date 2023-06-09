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
      <div className="my-auto aspect-square h-6 text-inherit">
        {isDark ? <SunSvg /> : <MoonSvg />}{" "}
      </div>
    );
    return wrapper;
  }
  const isvalidSession = !!session;
  const isLoaded = status !== "loading";
  const AccountInterface = getAccountInterface(
    isLoaded,
    session,
    buttonProps,
    colourTheme,
    isOpen,
    itemProps
  );

  let right = null;

  if (status === "loading") {
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

  return (
    <nav
      className={`text-white flex flex-row justify-between p-2 h-14 text-base leading-relaxed`}
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

      <div className="flex flex-row gap-2 items-center h-10 w-24">
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
        {AccountInterface}
      </div>
    </nav>
  );
};

export default Header;
function getAccountInterface(
  loaded: boolean,
  session: Session | null,
  buttonProps: ButtonProps<HTMLButtonElement>,
  colourTheme: boolean,
  isOpen: boolean,
  itemProps: {
    onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
    tabIndex: number;
    role: string;
    ref: React.RefObject<HTMLAnchorElement>;
  }[]
) {
  if (!loaded) return <p>Validating session ...</p>;

  if (session) {
    return (
      <>
        {session.user?.image ? (
          <div>
            <button
              className="h-10 w-10 my-auto"
              id="user-menu-button"
              {...buttonProps}
            >
              <img
                className={`rounded-full w-10 h-10 my-auto ${
                  colourTheme
                    ? "border-2 border-white "
                    : "border-2 border-black"
                }`}
                src={session.user.image}
                height={40}
                width={40}
                alt={"User image"}
              />
            </button>
            <div
              className={`absolute rounded right-2 border-2 grid gap-2 p-2 ${
                isOpen ? "visible" : ""
              } ${colourTheme ? " border-white " : " border-black "}`}
              role="menu"
              aria-labelledby="user-menu-button"
            >
              <Link
                {...itemProps[0]}
                href="/create"
                className={`rounded  text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition ${
                  colourTheme
                    ? "  p-1 hover:text-black hover:bg-white"
                    : "  text-black p-1 hover:text-white hover:bg-black"
                }`}
              >
                New post
              </Link>
              <Link
                {...itemProps[1]}
                href="/drafts"
                className={`rounded  text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition ${
                  colourTheme
                    ? "  p-1 hover:text-black hover:bg-white"
                    : "  text-black p-1 hover:text-white hover:bg-black"
                }`}
              >
                My drafts
              </Link>
              <a
                {...itemProps[2]}
                className={`rounded  text-center flex justify-center items-center h-10 my-auto w-28 hover:transition ${
                  colourTheme
                    ? "  p-1 hover:text-black hover:bg-white"
                    : "  text-black p-1 hover:text-white hover:bg-black"
                }`}
                onClick={() => signOut()}
              >
                Log out
              </a>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
