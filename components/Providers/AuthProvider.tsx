"use client";

import { FC, useEffect } from "react";
import { userStore } from "@/stores/useUser.store";
import { useRouter, usePathname } from "next/navigation";
import useSWRMutation from "swr/mutation";
import useSWRImmutable from "swr/immutable";
import { getUser } from "@/services/user.service";
import { refreshToken } from "@/services/auth.service";
import { getTokens } from "@/utils/getTokens";
import { isOnClient } from "@/utils/isOnClient";
import { alertStore } from "@/stores/useAlert.store";

interface AuthProviderProps {
  children: React.ReactNode;
}

const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/reset-password",
  "/auth/request-reset-password",
];

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const addAlert = alertStore((state) => state.addAlert);
  const router = useRouter();
  const pathname = usePathname();
  const tokens = getTokens();

  const { trigger: triggerRefresh, error: refreshError } = useSWRMutation(
    "/auth/refresh",
    refreshToken,
    {
      onError(err, key, config) {
        addAlert({
          message: err.message,
          errorList: "You must log in again",
          status: err.statusCode,
        });
        setUser(null);
      },
      onSuccess(data) {
        console.log("Refresh resonpose", data);
      },
    }
  );

  const { data, mutate, isLoading } = useSWRImmutable(
    tokens.accessToken ? "/users/current-user" : null,
    getUser,
    {
      shouldRetryOnError: false,
      onSuccess: (data) => {
        console.log("data", data);
        //If there is no user, send the user to the login page
        if (!data) {
          setUser(null);
          if (pathname !== "/") {
            router.push("/");
          }
        } else {
          setUser(data);
        }
      },
      onError: (err) => {
        //If there is an error, send the user to the login page
        if (err && tokens.accessToken) {
          addAlert({
            message: err.message,
            errorList: err.errorList,
            status: err.statusCode,
          });
          setUser(null);
          if (pathname !== "/") {
            router.push("/");
          }
        }
      },
    }
  );

  const { user, setUser } = userStore();

  const isPublicRoute = () => {
    if (publicRoutes.includes(pathname)) {
      return true;
    }
    return false;
  };

  const goBack = () => {
    if (isOnClient()) {
      window.history.back();
    }
  };

  //Refresh token every 5 minutes
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        console.log("Refreshing token");
        triggerRefresh();
      }, 300000);
      return () => clearInterval(interval);
    }
  }, [user, triggerRefresh]);

  const canNavigate = isPublicRoute();

  return (
    <>
      {canNavigate && children}
      {/* {!canNavigate && goBack()} */}
    </>
  );
};

export default AuthProvider;
