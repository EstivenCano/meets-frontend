import { setCookie } from "cookies-next";

export const setTokens = async (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    await window.localStorage.setItem("access_token", accessToken);
    await window.localStorage.setItem("refresh_token", refreshToken);
  }

  await setCookie("access_token", accessToken);
  await setCookie("refresh_token", refreshToken);
};
