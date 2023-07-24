"use client";

import Header from "@/components/header/Header";
import MainContentLink from "@/components/header/MainContentLink";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  function setThemeToLocalStorage(themeBoolean: boolean) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("theme", themeBoolean.toString());
    }
  }

  function getThemeFromSessionStorage() {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("theme") !== "false";
    }
    return true;
  }

  const [colourTheme, setColourTheme] = useState(true);
  //     const [colourTheme, setColourTheme] = useState(
  //     localStorage.getItem("theme") !== "false"
  //   );
  function toggleColourTheme() {
    setColourTheme((currentTheme: boolean | null) => !currentTheme);
    setThemeToLocalStorage(!colourTheme);
  }

  useEffect(() => {
    setColourTheme(getThemeFromSessionStorage());
  }, []);

  if (colourTheme === null) return null;
  return (
    <div
      id="theme-wrapper"
      className={`min-h-screen w-full  ${
        colourTheme ? "dark bg-bg-dk" : "bg-bg"
      }`}
    >
      <MainContentLink />
      <Header toggleColourTheme={toggleColourTheme} colourTheme={colourTheme} />
      <main id="main" className="relative w-full">
        {children}
      </main>
    </div>
  );
}
