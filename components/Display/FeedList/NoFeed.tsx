import { useTranslation } from "@/app/i18n/client";
import { motion } from "framer-motion";

export const NoFeed = () => {
  const { t } = useTranslation("feed");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
      }}
      className='flex flex-col items-center justify-center w-full h-full gap-y-4'>
      <h2 className='text-xl font-bold'>
        {t("welcome")} <span className='text-violet-400'>Meets</span>
      </h2>
      <p className='text-sm text-gray-500 text-center'>{t("noFeed")}</p>
    </motion.div>
  );
};
