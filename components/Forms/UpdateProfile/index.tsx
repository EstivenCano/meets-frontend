"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  UpdateProfileSchemaType,
  updateProfileSchema,
} from "./updateProfile.schema";
import useSWRMutation from "swr/mutation";
import { signup } from "@/services/auth.service";
import { alertStore } from "@/stores/useAlert.store";
import { match } from "ts-pattern";
import { userStore } from "@/stores/useUser.store";
import { Profile } from "@/services/model/Profile";
import { FC } from "react";
import { AvatarInput } from "./AvatarInput";
import { avatarImages } from "@/utils/constants/avatarImages";

interface UpdateProfileFormProps {
  profile: Profile;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({ profile }) => {
  const setUser = userStore((state) => state.setUser);
  const { trigger, isMutating } = useSWRMutation("/auth/signup", signup);
  const addAlert = alertStore((state) => state.addAlert);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: formErrors },
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit: SubmitHandler<UpdateProfileSchemaType> = (data) => {
    console.log(data.picture);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center justify-center space-y-4 w-full max-w-sm'>
      <TextField
        type='text'
        placeholder='Name'
        defaultValue={profile?.name}
        error={formErrors.name?.message}
        {...register("name")}
      />
      <TextField
        type='text'
        placeholder='Short description'
        defaultValue={profile?.bio}
        error={formErrors.bio?.message}
        {...register("bio")}
      />
      <fieldset className='flex flex-wrap gap-x-4 gap-y-4 py-2 max-w-lg'>
        <legend>Select a profile avatar:</legend>
        {avatarImages.map((avatar) => (
          <AvatarInput
            key={avatar}
            src={avatar}
            defaultChecked={profile?.picture === avatar}
            {...register("picture")}
          />
        ))}
      </fieldset>
      <Button
        color='green'
        size='auto'
        type='submit'
        onClick={() => {
          console.log(getValues());
        }}
        loading={isMutating}>
        {match(isMutating)
          .with(true, () => "Loading...")
          .otherwise(() => "Update profile")}
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
