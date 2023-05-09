"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewPostType, newPostSchema } from "./new-post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { alertStore } from "@/stores/useAlert.store";
import { userStore } from "@/stores/useUser.store";
import { TextArea } from "@/components/Inputs/TextArea";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconButton } from "@/components/Inputs/IconButton";
import { createDraft } from "@/services/post.service";
import { useRouterLocale } from "@/hooks/useRouter";
import { ArrowDown, ArrowUp } from "@/public/icons";
import { useTranslation } from "@/app/i18n/client";

const NewPostForm = () => {
  const { t } = useTranslation("post");
  const router = useRouterLocale();
  const user = userStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<NewPostType>({
    resolver: zodResolver(newPostSchema),
  });

  const { trigger: saveDraft, isMutating: savingDraft } = useSWRMutation(
    "/posts",
    createDraft
  );

  const addAlert = alertStore((state) => state.addAlert);

  const onSubmit: SubmitHandler<NewPostType> = (data) => {
    saveDraft({
      ...data,
      published: data.publish,
      authorEmail: user?.email || "",
    })
      .then((response) => {
        if (response) {
          toggleOpen();
          addAlert({
            message: t("success"),
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

  const onReset = () => {
    reset();
  };

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
    reset();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      className='flex flex-col items-center justify-center w-full bg-background p-4 max-w-6xl rounded-xl shadow-sm shadow-gray-400 dark:shadow-gray-600'>
      <span className='flex w-full justify-between items-start gap-x-2'>
        <TextField
          inputSize='sm'
          type='text'
          onClickCapture={handleOpen}
          placeholder={match(open)
            .with(true, () => t("addTitle"))
            .otherwise(() => t("whatIs"))}
          error={formErrors.title?.message}
          className='max-w-sm'
          {...register("title")}
        />
        <IconButton
          onClick={toggleOpen}
          size='xs'
          type='button'
          className='mt-1'
          icon={match(open)
            .with(true, () => <ArrowUp className='p-1' />)
            .otherwise(() => (
              <ArrowDown className='p-1' />
            ))}
          name={match(open)
            .with(true, () => t("close"))
            .otherwise(() => t("open"))}
        />
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className='flex mt-2 gap-y-2 flex-col overflow-hidden w-full'>
            <TextArea
              inputSize='sm'
              rows={5}
              placeholder={t("whatIs")}
              error={formErrors.content?.message}
              {...register("content")}
            />
            <fieldset className='flex flex-row gap-x-2 space-y-2'>
              <legend className='text-sm font-semibold'>
                {t("publishConfirmation")}
              </legend>
              <label className='text-xs'>{t("publish")}</label>
              <input
                type='checkbox'
                className='checked:accent-violet-400'
                {...register("publish")}
              />
            </fieldset>
            <span className='flex w-full justify-end gap-x-2 overflow-visible'>
              <Button color='red' size='sm' type='reset' loading={savingDraft}>
                {t("discard")}
              </Button>
              <Button
                color='green'
                size='sm'
                type='submit'
                loading={savingDraft}>
                {match(savingDraft)
                  .with(true, () => t("saving"))
                  .otherwise(() => t("save"))}
              </Button>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default NewPostForm;
