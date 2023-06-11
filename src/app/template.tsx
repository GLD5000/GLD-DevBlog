"use client";

import Header from "@/components/header/Header";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  function setThemeToLocalStorage(themeBoolean: boolean) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("theme", themeBoolean.toString());
    }
  }

  function getThemeFromSessionStorage() {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("theme") === "true";
    }
    return true;
  }

  const [colourTheme, setColourTheme] = useState<boolean | null>(null);
  //     const [colourTheme, setColourTheme] = useState(
  //     localStorage.getItem("theme") !== "false"
  //   );
  function toggleColourTheme() {
    setColourTheme((currentTheme: boolean |null) => !currentTheme);
    setThemeToLocalStorage(!colourTheme);
  }

  useEffect(()=>{
    setColourTheme(getThemeFromSessionStorage());
  }, []);


  if (colourTheme === null) return null;
  return (
    <div
      id="theme-wrapper"
      className={`w-screen min-h-screen  ${
        colourTheme ? "dark bg-black" : "bg-white"
      }`}
    >
      <Header
        toggleColourTheme={toggleColourTheme}
        toggleMenu={function (): void {
          throw new Error("Function not implemented.");
        }}
        colourTheme={colourTheme}
        showHamburger={false}
      />
      <main
        className="mx-auto w-body-sm min-w-body  max-w-body items-center
                sm:w-body"
      >
        {children}
      </main>
    </div>
  );
}
