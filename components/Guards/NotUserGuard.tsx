"use client";

import useIsMounted from "@/hooks/useIsMounted";
import { userStore } from "@/stores/useUser.store";
import { FC, useEffect } from "react";
import { match } from "ts-pattern";
import { useRouterLocale } from "@/hooks/useRouter";
import RedirectScreen from "../Feedback/RedirectScreen";
import { useParams } from "next/navigation";

interface NotUserGuardProps {
  children: React.ReactNode;
}

const NotUserGuard: FC<NotUserGuardProps> = ({ children }) => {
  const { lng } = useParams();
  const router = useRouterLocale();
  const user = userStore((state) => state.user);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (user) {
      router.push("/social/feed");
    }
  }, [user, router]);

  return (
    <>
      {match(user)
        .when(
          (user) => !user && isMounted,
          () => children
        )
        .when(
          (user) => user && !isMounted,
          /* @ts-expect-error Server Component */
          () => <RedirectScreen lng={lng} text='loading' />
        )
        .otherwise(() => (
          /* @ts-expect-error Server Component */
          <RedirectScreen lng={lng} text='redirecting' />
        ))}
    </>
  );
};

export default NotUserGuard;
