import { setCookie } from "cookies-next";

export const setTokens = async (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem("access_token", accessToken);
    window.localStorage.setItem("refresh_token", refreshToken);
  }

  await setCookie("access_token", accessToken);
  await setCookie("refresh_token", refreshToken);
};
