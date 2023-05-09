import { FC, useState } from "react";
import ListOfComments from "./ListOfComments";
import { useTranslation } from "@/app/i18n/client";

interface Comments {
  id: number;
  count: number;
}

const Comments: FC<Comments> = ({ id, count }) => {
  const { t } = useTranslation("common");
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
        {count} {t("comments")}
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
