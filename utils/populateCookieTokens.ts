import { getCookie } from "cookies-next";

export const populateCookieTokens = async () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const access = getCookie("access_token")?.toString();
    const refresh = getCookie("refresh_token")?.toString();

    if (access && refresh) {
      window.localStorage.setItem("access_token", access);
      window.localStorage.setItem("refresh_token", refresh);
    }
  }
};
