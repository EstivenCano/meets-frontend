"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import { login } from "@/services/auth.service";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchemaType, loginSchema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { alertStore } from "@/stores/useAlert.store";
import { userStore } from "@/stores/useUser.store";
import { useTranslation } from "@/app/i18n/client";

interface LoginSectionProps {
  lng: string;
}

const LoginSection = ({ lng }: LoginSectionProps) => {
  const { t } = useTranslation(lng, "login");
  const setUser = userStore((state) => state.setUser);
  const { trigger, isMutating } = useSWRMutation("/auth/signin", login);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const addAlert = alertStore((state) => state.addAlert);

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    trigger({ ...data })
      .then((response) => {
        if (response) {
          addAlert({
            message: response.message,
            status: response.status,
          });
          setUser(response.user);
        }
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
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center justify-center space-y-4 w-72'>
      <TextField
        type='email'
        placeholder={t("email")}
        error={formErrors.email?.message}
        {...register("email")}
      />
      <TextField
        type='password'
        placeholder={t("password")}
        error={formErrors.password?.message}
        {...register("password")}
      />
      <Button color='green' size='auto' type='submit' loading={isMutating}>
        {match(isMutating)
          .with(true, () => t("signIn"))
          .otherwise(() => t("signIn"))}
      </Button>
    </form>
  );
};

export default LoginSection;
