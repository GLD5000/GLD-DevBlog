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
          <div className="relative h-10 w-10 transition">
            <button
              className="h-10 w-10 "
              id="user-menu-button"
              {...buttonProps}
            >
              <img
                className={`rounded-full w-10 h-10 ${
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
                My Blogs
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
  return null;
}
