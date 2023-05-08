import { deleteCookie } from "cookies-next";

export const removeTokens = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
  }

  deleteCookie("access_token");
  deleteCookie("refresh_token");
};
