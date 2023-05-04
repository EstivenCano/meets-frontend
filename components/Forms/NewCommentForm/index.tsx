"use client";

import { Button } from "@/components/Inputs/Button";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewCommentType, newCommentSchema } from "./new-comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { alertStore } from "@/stores/useAlert.store";
import { userStore } from "@/stores/useUser.store";
import { newCommentToPost } from "@/services/post.service";
import { TextArea } from "@/components/Inputs/TextArea";
import { FC, useRef } from "react";
import { feedStore } from "@/stores/useFeed.store";

interface NewCommentFormProps {
  id: number;
}

const NewCommentForm: FC<NewCommentFormProps> = ({ id }) => {
  const { user } = userStore();
  const updateCommentCount = feedStore((state) => state.updateCommentCount);
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
    trigger({ ...data, authorEmail: user?.email || "" })
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
      className='flex border-t-2 border-gray-500/30 mt-auto flex-col items-center justify-center space-y-4 w-full p-4'>
      <TextArea
        inputSize='sm'
        rows={5}
        placeholder='Write your comment here...'
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
          .with(true, () => "Adding...")
          .otherwise(() => "Add comment")}
      </Button>
    </form>
  );
};

export default NewCommentForm;
