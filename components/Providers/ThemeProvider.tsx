"use client";

import { ThemeContext, THEME_CONTEXT_DEFAULT } from "@/hooks/useTheme";
import { Theme } from "@/model/Theme";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { match } from "ts-pattern";

interface ThemeProviderProps {
  children?: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(THEME_CONTEXT_DEFAULT.theme);

  //MediaQuery listener to change current theme depending on user's preferences
  const mqListener = useCallback(
    (e: MediaQueryListEvent) => handleSetTheme(e.matches ? "dark" : "light"),
    []
  );

  const handleSetTheme = (value: Theme) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    match(value)
      .with("dark", () => {
        document.documentElement.classList.add("dark"),
          document.body.setAttribute("data-theme", value);
      })
      .otherwise(() => {
        document.documentElement.classList.remove("dark");
        document.body.setAttribute("data-theme", value);
      });
  };

  //Listen any changes on prefers-color-scheme property to change the current theme
  useEffect(() => {
    const darkPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem("theme");
    if (darkPreference.matches && !storedTheme) {
      handleSetTheme("dark");
    } else {
      handleSetTheme(storedTheme as Theme);
    }

    darkPreference.addEventListener("change", mqListener);
    return () => {
      darkPreference.removeEventListener("change", mqListener);
    };
  }, [mqListener]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
