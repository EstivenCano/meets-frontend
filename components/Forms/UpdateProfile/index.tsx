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
import { Profile } from "@/model/Profile";
import { FC, useState } from "react";
import { RadioImage } from "../../Display/RadioImage";
import { avatarImages, avatarSets } from "@/utils/constants/avatarImages";
import { coverImages } from "@/utils/constants/coverImages";
import { updateUserProfile } from "@/services/user.service";
import { useRouterLocale } from "@/hooks/useRouter";
import { useTranslation } from "@/app/i18n/client";
import { useSWRConfig } from "swr";
import { Select } from "@/components/Inputs/Select";

interface UpdateProfileFormProps {
  profile: Profile;
  closeForm: () => void;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({
  profile,
  closeForm,
}) => {
  const { t } = useTranslation("profile");
  const [avatarSet, setAvatarSet] = useState(
    profile?.picture?.split("/")[4] || avatarSets[0].value
  );
  const router = useRouterLocale();
  const { user } = userStore();
  const addAlert = alertStore((state) => state.addAlert);
  const { mutate } = useSWRConfig();
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
            message: t("success"),
            status: response.status,
          });
          mutate(`/users/${user?.id}/profile`);
          router.refresh();
        }
      })
      .catch((error) => {
        addAlert({
          message: t("error"),
          errorList: error.errorList,
          status: error.statusCode,
        });
      });
  };

  const handleChangeSet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAvatarSet(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-fit space-y-4 w-full max-w-sm px-1 md:px-0'>
      <TextField
        type='text'
        placeholder={t("name")}
        defaultValue={profile?.name}
        error={formErrors.name?.message}
        {...register("name")}
      />
      <TextField
        type='text'
        placeholder={t("shortDescription")}
        defaultValue={profile?.bio}
        error={formErrors.bio?.message}
        {...register("bio")}
      />
      <fieldset className='flex flex-wrap justify-center gap-x-2 gap-y-2 py-2 max-w-lg'>
        <legend>{t("selectAvatar")}:</legend>
        <span className='w-full pb-2'>
          <Select
            name='Avatar collection'
            label='avatar set'
            options={avatarSets}
            value={avatarSet}
            onChange={handleChangeSet}
          />
        </span>
        {avatarImages(avatarSet).map((avatar) => (
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
        <legend>{t("selectCover")}:</legend>
        {coverImages.map((cover) => (
          <RadioImage
            key={cover}
            shape='rectangle'
            src={cover}
            defaultChecked={profile?.cover === cover}
            {...register("cover")}
          />
        ))}
        {formErrors.cover?.message}
      </fieldset>
      <div className='flex gap-x-4'>
        <Button
          color='red'
          size='auto'
          type='reset'
          onClick={() => {
            setAvatarSet(
              profile?.picture?.split("/")[4] || avatarSets[0].value
            );
          }}
          loading={isMutating}>
          {t("reset")}
        </Button>
        <Button color='green' size='auto' type='submit' loading={isMutating}>
          {match(isMutating)
            .with(true, () => t("updating"))
            .otherwise(() => t("update"))}
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
