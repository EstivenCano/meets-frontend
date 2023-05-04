"use client";

import useIsMounted from "@/hooks/useIsMounted";
import { userStore } from "@/stores/useUser.store";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";
import { match } from "ts-pattern";
import { RedirectScreen } from "../Feedback/RedirectScreen";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const user = userStore((state) => state.user);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  return (
    <>
      {match(user)
        .when(
          (user) => !!user && isMounted,
          () => children
        )
        .when(
          (user) => !!user && !isMounted,
          () => <RedirectScreen text='Loading' />
        )
        .otherwise(() => (
          <RedirectScreen />
        ))}
    </>
  );
};

export default AuthGuard;
