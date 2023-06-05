"use client";

import { Button } from "@/components/Inputs/Button";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewCommentType, newCommentSchema } from "./new-comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { alertStore } from "@/stores/useAlert.store";
import { newCommentToPost } from "@/services/post.service";
import { TextArea } from "@/components/Inputs/TextArea";
import { FC } from "react";
import { useFeedStore } from "@/stores/FeedStore/FeedContext";
import { useTranslation } from "@/app/i18n/client";

interface NewCommentFormProps {
  id: number;
}

const NewCommentForm: FC<NewCommentFormProps> = ({ id }) => {
  const { t } = useTranslation("common");
  const updateCommentCount = useFeedStore((state) => state.updateCommentCount);
  const { trigger, isMutating } = useSWRMutation(
    `/posts/${id}/comments`,
    newCommentToPost
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<NewCommentType>({
    resolver: zodResolver(newCommentSchema),
  });
  const addAlert = alertStore((state) => state.addAlert);

  const onSubmit: SubmitHandler<NewCommentType> = (data) => {
    trigger({ ...data })
      .then((response) => {
        if (response) {
          updateCommentCount(id);
          reset();
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
      className='flex border-t-2 border-gray-500/30 mt-auto flex-col items-center justify-center space-y-4 w-full px-4 pt-4 pb-1'>
      <TextArea
        inputSize='sm'
        rows={5}
        placeholder={t("writeComment")}
        error={formErrors.content?.message}
        {...register("content")}
      />
      <Button
        color='green'
        size='xs'
        type='submit'
        loading={isMutating}
        className='self-end'>
        {match(isMutating)
          .with(true, () => t("adding"))
          .otherwise(() => t("addComment"))}
      </Button>
    </form>
  );
};

export default NewCommentForm;
