"use client";

import useSWRMutation from "swr/mutation";
import { alertStore } from "@/stores/useAlert.store";
import { FC, FormEventHandler, useState } from "react";
import { IconButton } from "@/components/Inputs/IconButton";
import { Delete, Loading } from "@/public/icons";
import { match } from "ts-pattern";
import { useTranslation } from "@/app/i18n/client";
import { deleteUser } from "@/services/user.service";
import { userStore } from "@/stores/useUser.store";
import { Modal } from "@/components/Surfaces/Modal";
import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeletUserSchemaType, deleteUserSchema } from "./delete-user.schema";

const DeleteUserForm = () => {
  const { t } = useTranslation("settings");

  const [open, setOpen] = useState(false);
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<DeletUserSchemaType>({
    resolver: zodResolver(deleteUserSchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    `/users/${user?.id}`,
    deleteUser
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const addAlert = alertStore((state) => state.addAlert);

  const onSubmit: SubmitHandler<DeletUserSchemaType> = (data) => {
    trigger({ ...data })
      .then((response) => {
        if (response) {
          setUser(null);
          addAlert({
            message: t("deleteSuccess"),
            status: response.status,
          });
        }
      })
      .catch((error) => {
        addAlert({
          message: t("deleteError"),
          errorList: error.errorList,
          status: error.statusCode,
        });
      });
  };

  return (
    <>
      <Modal open={open} title={t("deleteAccount")} onClose={handleClose}>
        <div className='flex flex-col items-center gap-x-4 p-4'>
          <p>{t("deleteAccountConfirmation")}</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col w-full space-y-4 mt-4'>
            <p>{t("securityMessage")}</p>
            <TextField
              type='password'
              placeholder={t("password")}
              error={formErrors.password?.message}
              {...register("password")}
            />
            <div className='flex gap-x-4 mt-4 ml-auto'>
              <Button color='red' loading={isMutating} type='submit'>
                {match(isMutating)
                  .with(true, () => t("deleting"))
                  .otherwise(() => t("delete"))}
              </Button>
              <Button loading={isMutating} type='reset' onClick={handleClose}>
                {t("cancel")}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <button onClick={handleOpen} type='button'>
        {t("deleteAccount")}
      </button>
    </>
  );
};

export default DeleteUserForm;
