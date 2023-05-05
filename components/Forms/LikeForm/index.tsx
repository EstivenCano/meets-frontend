"use client";

import useSWRMutation from "swr/mutation";
import { alertStore } from "@/stores/useAlert.store";
import { FC, FormEventHandler } from "react";

import { likeUnlikePost } from "@/services/post.service";
import { Like } from "@/public/icons";
import { useFeedStore } from "@/stores/FeedStore/FeedContext";

interface LikeFormProps {
  id: number;
  liked: boolean;
}

const LikeForm: FC<LikeFormProps> = ({ id, liked = false }) => {
  const { trigger: triggerFollow, isMutating } = useSWRMutation(
    `/posts/${id}/${liked ? "unlike" : "like"}`,
    likeUnlikePost
  );

  const updateLike = useFeedStore((state) => state.updateLike);

  const addAlert = alertStore((state) => state.addAlert);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    updateLike(id, !liked);
    await triggerFollow().catch((error) => {
      addAlert({
        message: error.message,
        errorList: error.errorList,
        status: error.statusCode,
      });
      updateLike(id, !liked);
    });
  };

  return (
    <form onSubmit={onSubmit} className='flex'>
      <button
        type='submit'
        disabled={isMutating}
        className='disabled:text-gray-400'>
        <Like liked={liked} className={isMutating ? "animate-pulse" : ""} />
      </button>
    </form>
  );
};

export default LikeForm;
