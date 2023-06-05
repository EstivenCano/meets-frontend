"use client";

import { FC, useEffect, useMemo } from "react";
import { userStore } from "@/stores/useUser.store";
import { User } from "@/model/User";
import { populateCookieTokens } from "@/utils/populateCookieTokens";
import useEffectOnce from "@/hooks/useEfffectOnce";
import { routerStore } from "@/stores/useRouter.store";
import { motion } from "framer-motion";
import useDebounce from "@/hooks/useDebounce";
import { Loading } from "@/public/icons";
import { match } from "ts-pattern";

interface AuthProviderProps {
  children: React.ReactNode;
  user: User | null;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  user: serverUser,
}) => {
  const initialUser = useMemo(() => serverUser, [serverUser]);
  const { setUser } = userStore();
  const { loadingRoute } = routerStore();
  const load = useDebounce(loadingRoute, 1000);

  useEffectOnce(() => {
    populateCookieTokens();
  });

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  return (
    <>
      {match(loadingRoute)
        .when(
          (value) => value && load,
          () => (
            <div className='absolute flex items-center justify-center z-40 h-full w-full bg-white/30 dark:bg-black/30'>
              <Loading className='stroke-violet-500' />
            </div>
          )
        )
        .otherwise(() => null)}
      {children}
    </>
  );
};

export default AuthProvider;
