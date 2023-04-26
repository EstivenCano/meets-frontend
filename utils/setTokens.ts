import { setCookie } from "cookies-next";

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem("access_token", accessToken);
    window.localStorage.setItem("refresh_token", refreshToken);
  }

  setCookie("access_token", accessToken);
  setCookie("refresh_token", refreshToken);
};
