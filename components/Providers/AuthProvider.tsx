"use client";

import { FC, useEffect, useMemo } from "react";
import { userStore } from "@/stores/useUser.store";
import { User } from "@/model/User";
import { populateCookieTokens } from "@/utils/populateCookieTokens";
import useSWRMutation from "swr/mutation";
import { refreshToken } from "@/services/auth.service";
import { getCookie } from "cookies-next";
import { getUser } from "@/services/user.service";

interface AuthProviderProps {
  children: React.ReactNode;
  user: User | null;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  user: serverUser,
}) => {
  const initialUser = useMemo(() => serverUser, [serverUser]);
  const { user, setUser } = userStore();

  const { trigger: triggerGetUser } = useSWRMutation(
    "/users/current-user",
    getUser
  );

  const { trigger: triggerRefresh } = useSWRMutation(
    "/auth/refresh",
    refreshToken,
    {
      onSuccess() {
        handleRefreshSuccess();
      },
    }
  );

  useEffect(() => {
    populateCookieTokens();
  }, []);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      const refresh = getCookie("refresh_token");

      if (!refresh) return;
      triggerRefresh();
    }
  }, [initialUser, setUser, triggerRefresh]);

  const handleRefreshSuccess = async () => {
    if (!user) {
      await triggerGetUser().then((user) => {
        setUser(user);
      });
    }
  };

  return <>{children}</>;
};

export default AuthProvider;
