import DownArrowSvg from "@/assets/icons/DownArrowSvg";
import ExpandSvg from "@/assets/icons/ExpandSvg";
import WriteSvg from "@/assets/icons/WriteSvg";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

export default function UserMenu({
  loaded,
  session,
  colourTheme,
}: {
  loaded: boolean;
  session: Session | null;
  colourTheme: boolean;
}) {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(3);
  const isvalidSession = !!session;

  if (!loaded) return <p>...</p>;

  if (isvalidSession) {
    return (
      <>
        {session.user?.image ? (
          <div className="relative h-10 w-16 transition">
            <button
              className="h-10 w-16 p-1 rounded items-center grid grid-cols-autoAuto dark:hover:text-txt-main dark:hover:bg-white text-txt-main  hover:text-txt-main-dk hover:bg-black dark:text-txt-main-dk border-black dark:border-white hover:border-white dark:hover:border-black hover-transition focus-transition"
              id="user-menu-button"
              {...buttonProps}
            >
              <img
                className="rounded-full w-8 h-8 m-auto border-2 border-inherit"
                src={session.user.image}
                height={32}
                width={32}
                alt={"User image"}
              />
              <div className="h-6 p-[0.35rem] aspect-square m-auto">
                <ExpandSvg />
              </div>
            </button>
            <div
              className={`absolute rounded right-0 top-[calc(100%+0.75rem)] border-2 grid gap-2 p-2 ${
                isOpen ? "visible" : ""
              } ${
                colourTheme
                  ? " border-white bg-black "
                  : " border-black bg-white"
              }`}
              role="menu"
              aria-labelledby="user-menu-button"
            >
              <Link
                {...itemProps[0]}
                href="/create"
                className={`rounded  text-center flex xs:hidden justify-center items-center h-10 my-auto w-28 hover:transition ${
                  colourTheme
                    ? "  p-1 hover:text-txt-main hover:bg-white"
                    : "  text-txt-main p-1 hover:text-txt-main-dk hover:bg-black"
                }`}
              >
                <div className="h-8 p-[0.15rem] aspect-square">
                  <WriteSvg />
                </div>
                Write
              </Link>

              <Link
                {...itemProps[1]}
                href="/drafts"
                className={`rounded  text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition ${
                  colourTheme
                    ? "  p-1 hover:text-txt-main hover:bg-white"
                    : "  text-txt-main p-1 hover:text-txt-main-dk hover:bg-black"
                }`}
              >
                My Blogs
              </Link>
              <a
                {...itemProps[2]}
                className={`rounded  text-center flex justify-center items-center h-10 my-auto w-28 hover:transition ${
                  colourTheme
                    ? "  p-1 hover:text-txt-main hover:bg-white"
                    : "  text-txt-main p-1 hover:text-txt-main-dk hover:bg-black"
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
  return null;
}
