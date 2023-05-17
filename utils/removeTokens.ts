import { logout } from "@/services/auth.service";
import { userStore } from "@/stores/useUser.store";
import { deleteCookie } from "cookies-next";

export const removeTokens = async () => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    userStore.persist.clearStorage();
  }

  deleteCookie("access_token");
  deleteCookie("refresh_token");

  await logout("/auth/logout", { arg: { clean: false } });
};
