"use client";

import { Button } from "@/components/Inputs/Button";

import useSWRMutation from "swr/mutation";
import { alertStore } from "@/stores/useAlert.store";
import { FC, FormEventHandler } from "react";
import useSWRImmutable from "swr/immutable";

import { followUnfollowUser, isFollowingUser } from "@/services/user.service";
import { match } from "ts-pattern";
import { useRouter } from "next/navigation";

interface FollowFormProps {
  id: string;
}

const FollowForm: FC<FollowFormProps> = ({ id }) => {
  const router = useRouter();
  const {
    data: following,
    mutate,
    isLoading,
    isValidating,
  } = useSWRImmutable(`/users/${id}/is-following`, isFollowingUser);

  const { trigger: triggerFollow, isMutating } = useSWRMutation(
    `/users/${id}/${following ? "unfollow" : "follow"}`,
    followUnfollowUser
  );
  const addAlert = alertStore((state) => state.addAlert);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    triggerFollow()
      .then((response) => {
        if (response) {
          mutate();
          addAlert({
            message: response.message,
            status: response.status,
          });
        }
        router.refresh();
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
    <form onSubmit={onSubmit} className='absolute top-4 right-4'>
      <Button
        size='sm'
        color={following ? "green" : "violet"}
        type='submit'
        loading={isMutating || isValidating || isLoading}>
        {match(following)
          .with(true, () => "Unfollow")
          .otherwise(() => "Follow")}
      </Button>
    </form>
  );
};

export default FollowForm;