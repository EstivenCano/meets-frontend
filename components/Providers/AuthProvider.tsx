"use client";

import { FC, useEffect, useMemo } from "react";
import { userStore } from "@/stores/useUser.store";
import useSWRMutation from "swr/mutation";
import { logout, refreshToken } from "@/services/auth.service";
import { alertStore } from "@/stores/useAlert.store";
import { User } from "@/services/model/User";
import { setTokens } from "@/utils/setTokens";

interface AuthProviderProps {
  children: React.ReactNode;
  user: User | null;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  user: serverUser,
}) => {
  const initialUser = useMemo(() => serverUser, [serverUser]);
  const addAlert = alertStore((state) => state.addAlert);
  const { user, setUser } = userStore();

  const { trigger: triggerRefresh } = useSWRMutation(
    "/auth/refresh",
    refreshToken,
    {
      onError(err) {
        logout("/auth/logout");
        addAlert({
          message: err.message,
          errorList: "You must log in again",
          status: err.statusCode,
        });
        setUser(null);
      },
      onSuccess() {
        console.log("Refreshed token");
      },
    }
  );

  //Refresh token every 5 minutes
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        triggerRefresh();
      }, 270000);
      return () => clearInterval(interval);
    }
  }, [user, triggerRefresh]);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  return <>{children}</>;
};

export default AuthProvider;
