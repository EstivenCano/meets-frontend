"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupSchemaType, signupSchema } from "./signup.schema";
import useSWRMutation from "swr/mutation";
import { signup } from "@/services/auth.service";
import { alertStore } from "@/stores/useAlert.store";
import { match } from "ts-pattern";
import { userStore } from "@/stores/useUser.store";
import { useTranslation } from "@/app/i18n/client";

const SignupForm = () => {
  const { t } = useTranslation("signup");
  const setUser = userStore((state) => state.setUser);
  const { trigger, isMutating } = useSWRMutation("/auth/signup", signup);
  const addAlert = alertStore((state) => state.addAlert);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupSchemaType> = (data) => {
    trigger({ ...data })
      .then((response) => {
        if (response) {
          addAlert({
            message: t("success"),
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
        type='text'
        placeholder={t("name")}
        error={formErrors.name?.message}
        {...register("name")}
      />
      <TextField
        type='password'
        placeholder={t("password")}
        error={formErrors.password?.message}
        {...register("password")}
      />
      <TextField
        type='password'
        placeholder={t("confirmPassword")}
        error={formErrors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button color='green' size='auto' type='submit' loading={isMutating}>
        {match(isMutating)
          .with(true, () => t("loading"))
          .otherwise(() => t("signUp"))}
      </Button>
    </form>
  );
};

export default SignupForm;
