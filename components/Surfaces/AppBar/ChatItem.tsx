import { useRouterLocale } from "@/hooks/useRouter";
import { Comment } from "@/public/icons";
import { useTranslation } from "@/app/i18n/client";

export const ChatItem = () => {
  const { t } = useTranslation("app-bar");
  const router = useRouterLocale();

  const handleNavigate = () => {
    router.push(`/social/chat`);
  };

  return (
    <li
      tabIndex={0}
      className='flex gap-x-2 px-4 py-2 items-center text-sm hover:bg-violet-500 cursor-pointer hover:text-white'
      onClick={handleNavigate}>
      <Comment className='w-5 h-5' />
      {t("chat")}
    </li>
  );
};
