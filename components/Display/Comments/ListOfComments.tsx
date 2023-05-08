import { Modal } from "@/components/Surfaces/Modal";
import { FC } from "react";
import { ProfileImage } from "../ProfileImage";
import { useRouter } from "next/navigation";
import { dateToLongString } from "@/utils/dateToLongString";
import { dateSort } from "@/utils/dateSort";
import useSWRImmutable from "swr/immutable";
import { getComments } from "@/services/post.service";
import Skeleton from "@/components/Feedback/Skeleton";
import { Loading } from "@/public/icons";
import NewCommentForm from "@/components/Forms/NewCommentForm";

interface ListOfCommentsProps {
  id: number;
  showComments: boolean;
  handleClose: () => void;
}

const ListOfComments: FC<ListOfCommentsProps> = ({
  id,
  showComments,
  handleClose,
}) => {
  const { data: comments, isLoading } = useSWRImmutable(
    showComments ? `/posts/${id}/comments` : null,
    getComments,
    {
      keepPreviousData: true,
    }
  );
  const router = useRouter();

  const handleProfileClick = (id: number) => {
    router.push(`/social/profile/${id}`);
  };

  return (
    <>
      <Modal open={showComments} title='List of comments' onClose={handleClose}>
        <div className='w-full overflow-y-auto'>
          {comments
            ?.sort((a, b) => dateSort(a, b))
            .map((comment) => (
              <div
                className='flex flex-col gap-x-2 gap-y-3 w-full border-t-2 border-gray-500/30 px-6 py-2'
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
        </div>
        {isLoading && (
          <div className='flex flex-col px-4 gap-y-2 w-full'>
            <Loading className='absolute top-1/2 left-1/2 w-10 h-10 stroke-violet-500' />
            <Skeleton type='comment' />
            <Skeleton type='comment' />
          </div>
        )}
        {comments?.length === 0 && (
          <p className='text-sm pb-8'>No comments yet 😄</p>
        )}
        <NewCommentForm id={id} />
      </Modal>
    </>
  );
};

export default ListOfComments;
