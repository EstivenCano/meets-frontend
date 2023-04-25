"use client";

import { logout } from "@/services/auth.service";
import useSWRMutation from "swr/mutation";
import { Button } from "./Button";

const Logout = () => {
  const { trigger } = useSWRMutation("/auth/logout", logout);

  const handleLogout = () => {
    trigger()
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
