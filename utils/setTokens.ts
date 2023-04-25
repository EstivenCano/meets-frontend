import { setCookies } from "cookies-next";

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem("access_token", accessToken);
    window.localStorage.setItem("refresh_token", refreshToken);
  }

  setCookies("access_token", accessToken);
  setCookies("refresh_token", refreshToken);
};
