import Skeleton from "@/components/Feedback/Skeleton";
import { Loading } from "@/public/icons";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";

interface LoadingFeedProps {
  loading: boolean;
}

export const LoadingFeed: FC<LoadingFeedProps> = ({ loading }) => {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingRef.current && loading) {
      loadingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, loadingRef]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={loadingRef}
          className='relative'>
          <Skeleton type='post' />
          <Loading className='absolute top-1/2 left-1/2 w-10 h-10 stroke-violet-500' />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
