"use client";

import { logout } from "@/services/auth.service";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { alertStore } from "@/stores/useAlert.store";
import { Loading, Logout } from "@/public/icons";
import { userStore } from "@/stores/useUser.store";
import { useRouterLocale } from "@/hooks/useRouter";
import { useTranslation } from "@/app/i18n/client";

export const LogoutItem = () => {
  const { t } = useTranslation("app-bar");
  const router = useRouterLocale();
  const { trigger: triggerLogout, isMutating } = useSWRMutation(
    "/auth/logout",
    logout
  );
  const addAlert = alertStore((state) => state.addAlert);
  const setUser = userStore((state) => state.setUser);

  const handleLogout = () => {
    triggerLogout()
      .then(() => {
        setUser(null);
        addAlert({
          message: t("logoutSuccess"),
          status: 200,
        });
        window.location.href = "/";
      })
      .catch((error) => {
        addAlert({
          message: error.message,
          errorList: error.errorList,
          status: error.statusCode,
        });
        router.refresh();
      });
  };
  return (
    <li
      className='flex gap-x-2 px-4 py-2 text-sm items-center hover:bg-violet-500 cursor-pointer hover:text-white'
      onClick={match(isMutating)
        .with(false, () => handleLogout)
        .otherwise(() => () => {})}>
      {match(isMutating)
        .with(true, () => (
          <>
            <Loading className='w-5 h-5 stroke-text' />
            {t("loggingOut")}
          </>
        ))
        .otherwise(() => (
          <>
            <Logout className='w-5 h-5' />
            {t("logout")}
          </>
        ))}
    </li>
  );
};
