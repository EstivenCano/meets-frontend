import Skeleton from "@/components/Feedback/Skeleton";
import { Loading } from "@/public/icons";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useRef } from "react";

interface LoadingMessagesProps {
  loading: boolean;
}

export const LoadingMessages: FC<LoadingMessagesProps> = ({ loading }) => {
  const loadingRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={loadingRef}
          className='relative my-4'>
          <Skeleton type='comment' />
          <Loading className='absolute top-1/2 left-1/2 w-10 h-10 stroke-violet-500' />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
