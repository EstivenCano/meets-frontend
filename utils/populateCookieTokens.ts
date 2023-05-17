import { setCookie } from "cookies-next";

export const populateCookieTokens = async () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");

    await setCookie("access_token", access_token);
    await setCookie("refresh_token", refresh_token);
  }
};
