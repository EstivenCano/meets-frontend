"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import {
  ResetPasswordType,
  resetPasswordSchema,
} from "./reset-password.schema";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { resetPassword } from "@/services/auth.service";
import { alertStore } from "@/stores/useAlert.store";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useTranslation } from "@/app/i18n/client";

interface ResetPasswordFormProps {
  token: string;
  userId: string;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token, userId }) => {
  const { t } = useTranslation("reset-password");
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    "/auth/reset-password",
    resetPassword
  );
  const addAlert = alertStore((state) => state.addAlert);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: formErrors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordType> = () => {
    const { password } = getValues();
    trigger({ password, token, userId })
      .then((response) => {
        if (response) {
          addAlert({
            message: response.message,
            status: response.status,
          });
          router.push("/");
        }
      })
      .catch((error) => {
        addAlert({
          message: error.message,
          errorList: error.errorList,
          status: error.statusCode,
        });
        router.push("/auth/request-reset-password");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center justify-center space-y-4 w-72'>
      <TextField
        type='password'
        placeholder={t("newPassword")}
        error={formErrors.password?.message}
        {...register("password")}
      />
      <TextField
        type='password'
        placeholder={t("confirmNewPassword")}
        error={formErrors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button color='green' type='submit' loading={isMutating}>
        Reset password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
