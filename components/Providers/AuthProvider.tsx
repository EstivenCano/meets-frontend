"use client";

import { FC, useEffect, useMemo } from "react";
import { userStore } from "@/stores/useUser.store";
import useSWRMutation from "swr/mutation";
import useSWRImmutable from "swr/immutable";
import { logout, refreshToken } from "@/services/auth.service";
import { alertStore } from "@/stores/useAlert.store";
import { User } from "@/model/User";
import { getUser } from "@/services/user.service";
import { ServiceError } from "@/model/ServiceError";

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

  const { trigger: triggerGetUser } = useSWRMutation(
    "/users/current-user",
    getUser
  );

  const { trigger: triggerLogout } = useSWRMutation("/auth/logout", logout, {
    onError(err) {
      addAlert({
        message: err.message,
        errorList: err.errorList,
        status: err.statusCode,
      });
    },
  });

  const { trigger: triggerRefresh } = useSWRMutation(
    "/auth/refresh",
    refreshToken,
    {
      onError(err) {
        handleRefreshError(err);
      },
      onSuccess() {
        handleRefreshSuccess();
      },
    }
  );

  useSWRImmutable(user ? "/auth/refresh" : null, refreshToken, {
    onError(err) {
      handleRefreshError(err);
    },
    onSuccess() {
      handleRefreshSuccess();
    },
    focusThrottleInterval: 780000,
    refreshInterval: 840000,
  });

  const handleRefreshError = (err: ServiceError) => {
    setUser(null);
    triggerLogout().then((res) => {
      if (!res) return;
      addAlert({
        message: err.message,
        errorList: "You must log in again",
        status: err.statusCode,
      });
    });
  };

  const handleRefreshSuccess = async () => {
    if (!user) {
      await triggerGetUser().then((user) => {
        setUser(user);
      });
    }
  };

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      const refresh = localStorage.getItem("refresh_token");

      if (!refresh) return;
      triggerRefresh();
    }
  }, [initialUser, setUser, triggerRefresh]);

  return <>{children}</>;
};

export default AuthProvider;
