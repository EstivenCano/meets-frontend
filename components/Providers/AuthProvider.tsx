"use client";

import { FC, useEffect, useMemo } from "react";
import { userStore } from "@/stores/useUser.store";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { logout, refreshToken } from "@/services/auth.service";
import { alertStore } from "@/stores/useAlert.store";
import { User } from "@/services/model/User";
import { getUser } from "@/services/user.service";
import { match } from "ts-pattern";
import { ServiceError } from "@/services/model/serviceError";

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

  const { trigger: triggerLogout } = useSWRMutation("/auth/logout", logout);

  const { mutate: triggerRefresh } = useSWR(
    user ? "/auth/refresh" : null,
    refreshToken,
    {
      onError(err) {
        console.log("Refresh error");
        handleRefreshError(err);
      },
      onSuccess() {
        console.log("Refresh success");
        handleRefreshSuccess();
      },
      refreshInterval: 720000,
    }
  );

  const handleRefreshError = (err: ServiceError) => {
    setUser(null);
    triggerLogout().then(() => {
      addAlert({
        message: err.message,
        errorList: "You must log in again",
        status: err.statusCode,
      });
    });
  };

  const handleRefreshSuccess = () => {
    if (!user) {
      triggerGetUser().then((user) => {
        setUser(user);
      });
    }
  };

  // useEffect(() => {
  //   console.log("Refresh use effect");
  //   if (user) {
  //     const interval = setInterval(() => {
  //       triggerRefresh();
  //     }, 720000);
  //     return () => clearInterval(interval);
  //   } else {
  //     triggerRefresh().then(() => {
  //       triggerGetUser().then((user) => {
  //         setUser(user);
  //       });
  //     });
  //   }
  // }, [user, triggerRefresh, triggerGetUser, setUser]);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      triggerRefresh();
    }
  }, [initialUser, setUser, triggerRefresh]);

  return <>{children}</>;
};

export default AuthProvider;
