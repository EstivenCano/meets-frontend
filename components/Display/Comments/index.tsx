import { FC, useState } from "react";
import ListOfComments from "./ListOfComments";

interface Comments {
  id: number;
  count: number;
}

const Comments: FC<Comments> = ({ id, count }) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(true);
  };

  const handleClose = () => {
    setShowComments(false);
  };

  return (
    <>
      <button
        onClick={handleShowComments}
        className='text-xs text-gray-500 dark:text-gray-400'>
        {count} Comments
      </button>
      <ListOfComments
        id={id}
        handleClose={handleClose}
        showComments={showComments}
      />
    </>
  );
};

export default Comments;
