"use client";

import { Button } from "@/components/Inputs/Button";
import { Google } from "@/public/icons";
import { authWithGoogle } from "@/services/auth.service";
import { FC } from "react";

interface AuthGoogleProps {
  children: React.ReactNode;
}

export const AuthGoogle: FC<AuthGoogleProps> = ({ children }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authWithGoogle();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button size='md' type='submit'>
        <Google className='w-5 h-5' />
        {children}
      </Button>
    </form>
  );
};
