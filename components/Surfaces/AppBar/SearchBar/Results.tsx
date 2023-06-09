import { useTranslation } from "@/app/i18n/client";
import { ProfileImage } from "@/components/Display/ProfileImage";
import { UserInfo } from "@/model/UserInfo";
import { AnimatePresence, motion } from "framer-motion";
import { useRouterLocale } from "@/hooks/useRouter";
import { FC } from "react";

interface ResultsProps {
  isOpen: boolean;
  results?: UserInfo[];
}

export const Results: FC<ResultsProps> = ({ isOpen, results }) => {
  const { t } = useTranslation("app-bar");
  const router = useRouterLocale();

  const handleSelect = (id: number) => {
    router.push(`/social/profile/${id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='absolute max-w-3xl overflow-y-auto max-h-60 z-40 left-0 w-full py-2 bg-background rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-600 top-14 select-none'>
            {results?.map((user: UserInfo) => (
              <li
                tabIndex={0}
                key={user.id}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSelect(user.id);
                  }
                }}
                onClick={() => handleSelect(user.id)}
                className='flex items-center gap-x-2 px-4 py-2 text-sm focus:bg-violet-500 hover:bg-violet-500 cursor-pointer hover:text-white'>
                <ProfileImage
                  src={user.profile.picture}
                  alt={user.name}
                  size='xxs'
                />
                <p className='font-semibold'>{user.name}</p>
              </li>
            ))}
            {results?.length === 0 && (
              <li className='flex items-center px-4 py-2 text-sm text-gray-500'>
                <p>{t("noResults")}</p>
              </li>
            )}
            {!results && (
              <li className='flex items-center px-4 py-2 text-sm text-gray-500'>
                <p>{t("startTyping")}</p>
              </li>
            )}
          </motion.ul>
        </>
      )}
    </AnimatePresence>
  );
};
