"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import { useRef } from "react";
import { login } from "@/services/auth.service";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { useForm } from "react-hook-form";
import { LoginSchemaType, loginSchema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { alertStore } from "@/stores/useAlert.store";
import { useRouter } from "next/navigation";

const LoginSection = () => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("/auth/signin", login);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const addAlert = alertStore((state) => state.addAlert);

  const onSubmit = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    trigger({ email, password })
      .then((response) => {
        if (response) {
          addAlert({
            message: response.message,
            status: response.status,
          });
        }
        router.push("/feed");
      })
      .catch((error) => {
        addAlert({
          message: error.message,
          errorList: error.errorList,
          status: error.statusCode,
        });
      });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center justify-center space-y-4 w-72'>
      <TextField
        type='email'
        placeholder='Email'
        error={formErrors.email?.message}
        {...register("email")}
      />
      <TextField
        type='password'
        placeholder='Password'
        error={formErrors.password?.message}
        {...register("password")}
      />
      <Button color='green' size='auto' loading={isMutating}>
        {match(isMutating)
          .with(true, () => "Signing in...")
          .otherwise(() => "Sign in")}
      </Button>
    </form>
  );
};

export default LoginSection;
