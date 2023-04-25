import { removeCookies } from "cookies-next";

export const removeTokens = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
  }

  removeCookies("access_token");
  removeCookies("refresh_token");
};
