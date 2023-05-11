import { deleteCookie } from "cookies-next";

export const removeTokens = async () => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  deleteCookie("access_token");
  deleteCookie("refresh_token");
};
