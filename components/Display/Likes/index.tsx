import { FC, useState } from "react";
import ListOfLikes from "./ListOfLikes";
import { useTranslation } from "@/app/i18n/client";

interface LikesProps {
  id: number;
  count: number;
}

const Likes: FC<LikesProps> = ({ id, count }) => {
  const { t } = useTranslation("common");
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
        {count} {t("likes")}
      </button>
      <ListOfLikes id={id} handleClose={handleClose} showLikes={showLikes} />
    </>
  );
};

export default Likes;
