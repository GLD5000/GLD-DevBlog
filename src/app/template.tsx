"use client";

import Header from "@/components/Header";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  function setThemeToLocalStorage(themeBoolean: boolean) {
    localStorage.setItem("theme", themeBoolean.toString());
  }
  const [colourTheme, setColourTheme] = useState(false)
//     const [colourTheme, setColourTheme] = useState(
//     localStorage.getItem("theme") !== "false"
//   );
  function toggleColourTheme() {
    setColourTheme((currentTheme: boolean) => !currentTheme);
    // setThemeToLocalStorage(!colourTheme);
  }
  return (
    <div id="theme-wrapper" className={`bg-slate-500 ${colourTheme ? "dark" : undefined}`}>
      <Header
        toggleColourTheme={toggleColourTheme}
        toggleMenu={function (): void {
          throw new Error("Function not implemented.");
        }}
        colourTheme={colourTheme}
        showHamburger={false}
      />

      {children}
    </div>
  );
}
