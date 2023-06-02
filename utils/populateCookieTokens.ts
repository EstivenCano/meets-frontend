import { getCookie, setCookie } from "cookies-next";

export const populateCookieTokens = async () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const accessCookie = getCookie("access_token")?.toString();
    const refreshCookie = getCookie("refresh_token")?.toString();
    const accessLocal = window.localStorage.getItem("access_token");
    const refreshLocal = window.localStorage.getItem("refresh_token");

    if (accessCookie && refreshCookie) {
      window.localStorage.setItem("access_token", accessCookie);
      window.localStorage.setItem("refresh_token", refreshCookie);
    } else if (accessLocal && refreshLocal) {
      setCookie("access_token", accessLocal);
      setCookie("refresh_token", refreshLocal);
    }
  }
};
