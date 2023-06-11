"use client";

import Header from "@/components/header/Header";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  function setThemeToLocalStorage(themeBoolean: boolean) {
    if  (typeof window !== "undefined") {
      localStorage.setItem("theme", themeBoolean.toString());
    }
  }

  function getThemeFromLocalStorage() {
    if  (typeof window !== "undefined") {
     return localStorage.getItem("theme") === "true"
    }
    return true;
  }

  const [colourTheme, setColourTheme] = useState(getThemeFromLocalStorage());
//     const [colourTheme, setColourTheme] = useState(
//     localStorage.getItem("theme") !== "false"
//   );
  function toggleColourTheme() {
    setColourTheme((currentTheme: boolean) => !currentTheme);
    setThemeToLocalStorage(!colourTheme);
  }
  return (
    <div id="theme-wrapper" className={`w-screen min-h-screen  ${colourTheme ? "dark bg-black" : 'bg-white'}`}>
      <Header
        toggleColourTheme={toggleColourTheme}
        toggleMenu={function (): void {
          throw new Error("Function not implemented.");
        }}
        colourTheme={colourTheme}
        showHamburger={false}
      />
<main className="mx-auto w-body-sm min-w-body  max-w-body items-center
                sm:w-body">

      {children}
</main>
    </div>
  );
}
