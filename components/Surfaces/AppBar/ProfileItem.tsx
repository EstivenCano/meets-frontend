import { useRouterLocale } from "@/hooks/useRouter";
import { FC } from "react";
import { Profile } from "@/public/icons";
import { useTranslation } from "@/app/i18n/client";

interface ProfileItemProps {
  id?: string;
}

export const ProfileItem: FC<ProfileItemProps> = ({ id }) => {
  const { t } = useTranslation("app-bar");
  const router = useRouterLocale();

  const handleNavigate = () => {
    if (!id) return;
    router.push(`/social/profile/${id}`);
  };

  return (
    <li
      tabIndex={0}
      className='flex gap-x-2 px-4 py-2 items-center text-sm hover:bg-violet-500 cursor-pointer hover:text-white'
      onClick={handleNavigate}>
      <Profile className='w-5 h-5' />
      {t("yourProfile")}
    </li>
  );
};
