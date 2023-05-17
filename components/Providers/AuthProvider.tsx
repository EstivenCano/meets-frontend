"use client";

import { FC, useEffect, useMemo } from "react";
import { userStore } from "@/stores/useUser.store";
import { User } from "@/model/User";
import { populateCookieTokens } from "@/utils/populateCookieTokens";

interface AuthProviderProps {
  children: React.ReactNode;
  user: User | null;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  user: serverUser,
}) => {
  const initialUser = useMemo(() => serverUser, [serverUser]);
  const setUser = userStore((state) => state.setUser);

  useEffect(() => {
    userStore.persist.rehydrate();
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  useEffect(() => {
    populateCookieTokens();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
