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
import { alertStore } from "@/stores/useAlert.store";
import { match } from "ts-pattern";
import { userStore } from "@/stores/useUser.store";
import { Profile } from "@/services/model/Profile";
import { FC } from "react";
import { RadioImage } from "../../Display/RadioImage";
import { avatarImages } from "@/utils/constants/avatarImages";
import { coverImages } from "@/utils/constants/coverImages";
import { updateUserProfile } from "@/services/user.service";
import { useRouter } from "next/navigation";

interface UpdateProfileFormProps {
  profile: Profile;
  closeForm: () => void;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({
  profile,
  closeForm,
}) => {
  const router = useRouter();
  const { user } = userStore();
  const addAlert = alertStore((state) => state.addAlert);
  const { trigger, isMutating } = useSWRMutation(
    user ? `/users/${user.id}/profile` : null,
    updateUserProfile
  );

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit: SubmitHandler<UpdateProfileSchemaType> = (data) => {
    trigger(data)
      .then((response) => {
        closeForm();
        if (response) {
          addAlert({
            message: response.message,
            status: response.status,
          });
          router.refresh();
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
      className='flex flex-col h-fit space-y-4 w-full max-w-sm'>
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
      <fieldset className='flex flex-wrap gap-x-2 gap-y-2 py-2 max-w-lg'>
        <legend>Select a profile avatar:</legend>
        {avatarImages.map((avatar) => (
          <RadioImage
            key={avatar}
            src={avatar}
            defaultChecked={profile?.picture === avatar}
            {...register("picture")}
          />
        ))}
        {formErrors.picture?.message}
      </fieldset>
      <fieldset className='flex flex-wrap justify-center py-2 max-w-lg'>
        <legend>Select a profile cover:</legend>
        {coverImages.map((cover) => (
          <RadioImage
            key={cover}
            shape='rectangle'
            size='md'
            src={cover}
            defaultChecked={profile?.cover === cover}
            {...register("cover")}
          />
        ))}
        {formErrors.cover?.message}
      </fieldset>
      <div className='flex gap-x-4'>
        <Button color='red' size='auto' type='reset' loading={isMutating}>
          Reset
        </Button>
        <Button color='green' size='auto' type='submit' loading={isMutating}>
          {match(isMutating)
            .with(true, () => "Loading...")
            .otherwise(() => "Update profile")}
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;