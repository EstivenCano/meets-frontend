"use client";

import useIsMounted from "@/hooks/useIsMounted";
import { userStore } from "@/stores/useUser.store";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";
import { match, P } from "ts-pattern";
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
      {match(isMounted && !!user)
        .with(true, () => children)
        .otherwise(() => (
          <RedirectScreen />
        ))}
    </>
  );
};

export default AuthGuard;
