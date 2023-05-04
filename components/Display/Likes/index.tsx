import { FC, useState } from "react";
import ListOfLikes from "./ListOfLikes";

interface LikesProps {
  id: number;
  count: number;
}

const Likes: FC<LikesProps> = ({ id, count }) => {
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
      <ListOfLikes id={id} handleClose={handleClose} showLikes={showLikes} />
    </>
  );
};

export default Likes;
