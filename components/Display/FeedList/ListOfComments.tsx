import { Modal } from "@/components/Surfaces/Modal";
import { Comment } from "@/services/model/Feed";
import { FC, useState } from "react";
import { ProfileImage } from "../ProfileImage";
import { useRouter } from "next/navigation";
import { dateToLongString } from "@/utils/dateToLongString";
import { dateSort } from "@/utils/dateSort";

interface ListOfCommentsProps {
  comments: Comment[];
  count: number;
}

const ListOfComments: FC<ListOfCommentsProps> = ({ comments, count }) => {
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(true);
  };

  const handleClose = () => {
    setShowComments(false);
  };

  const handleProfileClick = (id: number) => {
    router.push(`/social/profile/${id}`);
  };

  return (
    <>
      <button
        onClick={handleShowComments}
        className='text-xs text-gray-500 dark:text-gray-400'>
        {count} Comments
      </button>

      <Modal open={showComments} title='List of comments' onClose={handleClose}>
        {comments
          .sort((a, b) => dateSort(a.createdAt, b.createdAt))
          .map((comment) => (
            <div
              className='flex flex-col gap-x-2 gap-y-3 w-full border-b-2 border-gray-500/30 px-6 py-2'
              key={comment.id}>
              <span className='relative flex items-center gap-x-2 w-full'>
                <ProfileImage
                  size='xxs'
                  src={comment.author.profile.picture}
                  alt={comment.author.name}
                  className='cursor-pointer'
                  onClick={() => handleProfileClick(comment.author.id)}
                />
                <span className='block'>
                  <p className='text-sm'>{comment.author.name}</p>
                  <p className='text-xs text-gray-500'>
                    {dateToLongString(new Date(comment.createdAt))}
                  </p>
                </span>
              </span>
              <p className='text-sm'>{comment.content}</p>
            </div>
          ))}
        {count === 0 && <p className='text-sm'>No comments yet 😄</p>}
      </Modal>
    </>
  );
};

export default ListOfComments;
