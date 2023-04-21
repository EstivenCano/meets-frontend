"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import {
  RequestResetPasswordType,
  requestResetPasswordSchema,
} from "./request-reset-password.schema";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { requestResetPassword } from "@/services/auth.service";
import { alertStore } from "@/stores/useAlert.store";
import { useState } from "react";
import { match } from "ts-pattern";

const RequestResetPassword = () => {
  const { trigger, isMutating } = useSWRMutation(
    "/auth/request-reset-password",
    requestResetPassword
  );
  const [emailSent, setEmailSent] = useState(false);
  const addAlert = alertStore((state) => state.addAlert);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: formErrors },
  } = useForm<RequestResetPasswordType>({
    resolver: zodResolver(requestResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<RequestResetPasswordType> = (data) => {
    trigger({ ...data })
      .then((response) => {
        if (response) {
          addAlert({
            message: response.message,
            status: response.status,
          });
          setEmailSent(true);
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
    <>
      {match(emailSent)
        .with(true, () => (
          <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
            <p className='text-lg font-semibold max-w-lg'>
              {"We've sent an email to "}
              <span className='text-violet-400'>{getValues("email")}</span>
            </p>
            <p className='text-lg font-semibold max-w-lg'>
              {"Please, check your inbox."}
            </p>
          </div>
        ))
        .otherwise(() => (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center justify-center space-y-4 w-72'>
            <TextField
              type='email'
              placeholder='Email'
              error={formErrors.email?.message}
              {...register("email")}
            />
            <Button color='green' type='submit' loading={isMutating}>
              Reset password
            </Button>
          </form>
        ))}
    </>
  );
};

export default RequestResetPassword;
