import { createContext, useContext } from "react";
import { Theme } from "@/model/Theme";

type DefaultContext = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

export const THEME_CONTEXT_DEFAULT: DefaultContext = {
  theme: "dark",
  setTheme: () => null,
};

export const ThemeContext = createContext(THEME_CONTEXT_DEFAULT);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext used outside ThemeContext provider");
  }

  return context;
};
