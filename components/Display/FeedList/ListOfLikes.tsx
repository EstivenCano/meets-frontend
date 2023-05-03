"use client";

import { UserInfo } from "@/services/model/Feed";
import { FC, Fragment, useState } from "react";
import { ProfileImage } from "../ProfileImage";
import { Modal } from "@/components/Surfaces/Modal";

interface ListOfLikesProps {
  likedBy: UserInfo[];
  count: number;
}

const ListOfLikes: FC<ListOfLikesProps> = ({ likedBy, count }) => {
  const [showLikes, setShowLikes] = useState(false);

  const handleShowLikes = () => {
    setShowLikes(true);
  };

  const handleClose = () => {
    setShowLikes(false);
  };

  return (
    <>
      <button
        onClick={handleShowLikes}
        className='text-xs text-gray-500 dark:text-gray-400'>
        {count} Likes
      </button>
      <Modal open={showLikes} title='List of likes' onClose={handleClose}>
        <div className='flex items-center gap-x-3 w-full py-2 px-6'>
          {likedBy.map((user) => (
            <Fragment key={user.id}>
              <ProfileImage
                size='xxs'
                src={user.profile.picture}
                alt={user.name}
                className='w-8 h-8 rounded-full cursor-pointer'
              />
              <p className='text-sm font-semibold'>{user.name}</p>
            </Fragment>
          ))}
        </div>
        {count === 0 && <p className='text-sm'>No likes yet 😄</p>}
      </Modal>
    </>
  );
};

export default ListOfLikes;
