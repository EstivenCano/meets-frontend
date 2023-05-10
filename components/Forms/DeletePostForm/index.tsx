"use client";

import useSWRMutation from "swr/mutation";
import { alertStore } from "@/stores/useAlert.store";
import { FC, FormEventHandler } from "react";
import { deletePostById } from "@/services/post.service";
import { IconButton } from "@/components/Inputs/IconButton";
import { Delete, Loading } from "@/public/icons";
import { useFeedStore } from "@/stores/FeedStore/FeedContext";
import { match } from "ts-pattern";
import { useTranslation } from "@/app/i18n/client";

interface DeleteFormProps {
  id: number;
}

const DeleteForm: FC<DeleteFormProps> = ({ id }) => {
  const { t } = useTranslation("common");
  const deletePost = useFeedStore((state) => state.deletePost);

  const { trigger, isMutating } = useSWRMutation(
    `/posts/${id}`,
    deletePostById
  );
  const addAlert = alertStore((state) => state.addAlert);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    trigger()
      .then((response) => {
        if (response) {
          deletePost(id);
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
    <form onSubmit={onSubmit} className='flex ml-auto self-start'>
      <IconButton
        icon={match(isMutating)
          .with(true, () => <Loading className='stroke-current' />)
          .otherwise(() => (
            <Delete className='p-1' />
          ))}
        size='xs'
        name={t("delete")}
        disabled={isMutating}
        className='hover:bg-red-600 hover:text-white'
        onClick={() => {}}
      />
    </form>
  );
};

export default DeleteForm;
