"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupSchemaType, signupSchema } from "./signup.schema";
import useSWRMutation from "swr/mutation";
import { signup } from "@/services/auth.service";
import { alertStore } from "@/stores/useAlert.store";
import { useRouter } from "next/navigation";
import { match } from "ts-pattern";

const SignupForm = () => {
  const router = useRouter();
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
            message: response.message,
            status: response.status,
          });
          router.push("/feed");
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
        placeholder='Email'
        error={formErrors.email?.message}
        {...register("email")}
      />
      <TextField
        type='text'
        placeholder='Name'
        error={formErrors.name?.message}
        {...register("name")}
      />
      <TextField
        type='password'
        placeholder='Password'
        error={formErrors.password?.message}
        {...register("password")}
      />
      <TextField
        type='password'
        placeholder='Confirm password'
        error={formErrors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button color='green' size='auto' type='submit' loading={isMutating}>
        {match(isMutating)
          .with(true, () => "Loading...")
          .otherwise(() => "Sign up")}
      </Button>
    </form>
  );
};

export default SignupForm;
