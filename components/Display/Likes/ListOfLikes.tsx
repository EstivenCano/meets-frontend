"use client";

import { FC } from "react";
import { ProfileImage } from "../ProfileImage";
import { Modal } from "@/components/Surfaces/Modal";
import { useRouterLocale } from "@/hooks/useRouter";
import useSWRImmutable from "swr/immutable";
import { getLikes } from "@/services/post.service";
import Skeleton from "@/components/Feedback/Skeleton";
import { Loading } from "@/public/icons";
import { useTranslation } from "@/app/i18n/client";

interface ListOfLikesProps {
  id: number;
  showLikes: boolean;
  handleClose: () => void;
}

const ListOfLikes: FC<ListOfLikesProps> = ({ id, showLikes, handleClose }) => {
  const { t } = useTranslation("common");
  const { data: likes, isLoading } = useSWRImmutable(
    showLikes ? `/posts/${id}/likes` : null,
    getLikes
  );

  const router = useRouterLocale();

  const handleProfileClick = (id: number) => {
    router.push(`/social/profile/${id}`);
  };

  return (
    <Modal open={showLikes} title={t("listOfLikes")} onClose={handleClose}>
      <div className='flex flex-wrap items-center gap-y-4 gap-x-8 py-2 px-6'>
        {likes?.map((user) => (
          <span className='flex items-center gap-x-2' key={user.id}>
            <ProfileImage
              size='xxs'
              src={user.profile.picture}
              alt={user.name}
              className='w-8 h-8 rounded-full cursor-pointer'
              onClick={() => handleProfileClick(user.id)}
            />
            <p className='text-sm font-semibold'>{user.name}</p>
          </span>
        ))}
      </div>
      {isLoading && (
        <div className='relative flex w-full flex-row md:justify-center flex-wrap gap-y-4 gap-x-8 py-2 px-6'>
          <Loading className='absolute top-1/2 left-1/2 w-10 h-10 stroke-violet-500' />
          <Skeleton type='likes' />
          <Skeleton type='likes' />
        </div>
      )}
      {likes?.length === 0 && <p className='text-sm'>{t("noLikes")}</p>}
    </Modal>
  );
};

export default ListOfLikes;
