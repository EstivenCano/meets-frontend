"use client";

import { UserInfo } from "@/services/model/Feed";
import { FC, useState } from "react";
import { ProfileImage } from "../ProfileImage";
import { Modal } from "@/components/Surfaces/Modal";
import { useRouter } from "next/navigation";

interface ListOfLikesProps {
  likedBy: UserInfo[];
  count: number;
}

const ListOfLikes: FC<ListOfLikesProps> = ({ likedBy, count }) => {
  const [showLikes, setShowLikes] = useState(false);
  const router = useRouter();

  const handleShowLikes = () => {
    setShowLikes(true);
  };

  const handleClose = () => {
    setShowLikes(false);
  };

  const handleProfileClick = (id: number) => {
    router.push(`/social/profile/${id}`);
  };

  return (
    <>
      <button
        onClick={handleShowLikes}
        className='text-xs text-gray-500 dark:text-gray-400'>
        {count} Likes
      </button>
      <Modal open={showLikes} title='List of likes' onClose={handleClose}>
        <div className='flex flex-wrap items-center gap-y-4 gap-x-8 py-2 px-6'>
          {likedBy.map((user) => (
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
        {count === 0 && <p className='text-sm'>No likes yet 😄</p>}
      </Modal>
    </>
  );
};

export default ListOfLikes;
