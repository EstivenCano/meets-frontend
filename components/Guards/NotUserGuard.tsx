"use client";

import useIsMounted from "@/hooks/useIsMounted";
import { userStore } from "@/stores/useUser.store";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";
import { match } from "ts-pattern";

interface NotUserGuardProps {
  children: React.ReactNode;
}

const NotUserGuard: FC<NotUserGuardProps> = ({ children }) => {
  const user = userStore((state) => state.user);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (user) {
      return redirect("/feed");
    }
  }, [user]);

  return (
    <>
      {match(isMounted && !user)
        .with(true, () => children)
        .otherwise(() => null)}
    </>
  );
};

export default NotUserGuard;
