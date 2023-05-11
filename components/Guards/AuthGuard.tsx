"use client";

import useIsMounted from "@/hooks/useIsMounted";
import { userStore } from "@/stores/useUser.store";
import { FC, useEffect } from "react";
import { match } from "ts-pattern";
import dynamic from "next/dynamic";
import { useTranslation } from "@/app/i18n/client";
import { useRouterLocale } from "@/hooks/useRouter";

const RedirectScreen = dynamic(() => import("../Feedback/RedirectScreen"));

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { t } = useTranslation("common");
  const router = useRouterLocale();
  const user = userStore((state) => state.user);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      {match(user)
        .when(
          (user) => !!user && isMounted,
          () => children
        )
        .when(
          (user) => !!user && !isMounted,
          () => <RedirectScreen text={t("loading")} />
        )
        .otherwise(() => (
          <RedirectScreen text={t("redirecting")} />
        ))}
    </>
  );
};

export default AuthGuard;
