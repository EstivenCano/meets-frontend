import { isOnClient } from "./isOnClient";

/**
 * Get tokens from local storage
 * @returns {object} accessToken and refreshToken
 */
export const getTokens = async () => {
  if (isOnClient() && window.localStorage) {
    const accessToken = window.localStorage.getItem("access_token");
    const refreshToken = window.localStorage.getItem("refresh_token");
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
  }

  let accessToken = "";
  let refreshToken = "";

  if (!isOnClient()) {
    const { cookies } = await import("next/headers");
    accessToken = cookies().get("access_token")?.value || "";
    refreshToken = cookies().get("refresh_token")?.value || "";
  }

  return {
    accessToken,
    refreshToken,
  };
};
