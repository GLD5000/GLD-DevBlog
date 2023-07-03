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
              className="hover-transition focus-transition grid h-10 w-16 grid-cols-autoAuto items-center rounded border-txt-main p-1  text-txt-main hover:border-txt-main-dk hover:bg-bg-dk hover:text-txt-main-dk dark:border-txt-main-dk dark:text-txt-main-dk dark:hover:border-txt-main dark:hover:bg-bg dark:hover:text-txt-main"
              id="user-menu-button"
              {...buttonProps}
            >
              <img
                className="m-auto h-8 w-8 rounded-full border-2 border-inherit"
                src={session.user.image}
                height={32}
                width={32}
                alt={"User"}
              />
              <div className="m-auto aspect-square h-6 p-[0.35rem]">
                <ExpandSvg />
              </div>
            </button>
            <div
              className={`absolute right-0 top-[calc(100%+0.75rem)] grid gap-2 rounded border-2 p-2 ${
                isOpen ? "visible" : ""
              } ${
                colourTheme
                  ? " border-txt-main-dk bg-bg-dk "
                  : " border-txt-main bg-bg"
              }`}
              role="menu"
              aria-labelledby="user-menu-button"
            >
              <Link
                {...itemProps[0]}
                href="/create"
                className={`my-auto  flex h-10 w-28 items-center justify-center rounded text-center hover:transition xs:hidden ${
                  colourTheme
                    ? "  p-1 hover:bg-bg hover:text-txt-main"
                    : "  p-1 text-txt-main hover:bg-bg-dk hover:text-txt-main-dk"
                }`}
              >
                <div className="aspect-square h-8 p-[0.15rem]">
                  <WriteSvg />
                </div>
                Write
              </Link>

              <Link
                {...itemProps[1]}
                href="/drafts"
                className={`my-auto  flex h-10  w-28 items-center justify-center rounded text-center hover:transition ${
                  colourTheme
                    ? "  p-1 hover:bg-bg hover:text-txt-main"
                    : "  p-1 text-txt-main hover:bg-bg-dk hover:text-txt-main-dk"
                }`}
              >
                My Blogs
              </Link>
              <a
                {...itemProps[2]}
                className={`my-auto  flex h-10 w-28 items-center justify-center rounded text-center hover:transition ${
                  colourTheme
                    ? "  p-1 hover:bg-bg hover:text-txt-main"
                    : "  p-1 text-txt-main hover:bg-bg-dk hover:text-txt-main-dk"
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
