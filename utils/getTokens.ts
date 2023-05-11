import { getCookie } from "cookies-next";

/**
 * Get tokens from local storage
 * @returns {object} accessToken and refreshToken
 */
export const getTokens = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const accessToken = window.localStorage.getItem("access_token");
    const refreshToken = window.localStorage.getItem("refresh_token");
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
  }

  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");

  return {
    accessToken,
    refreshToken,
  };
};
