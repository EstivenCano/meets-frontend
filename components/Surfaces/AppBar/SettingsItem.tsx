import { useRouterLocale } from "@/hooks/useRouter";
import { Settings } from "@/public/icons";
import { useTranslation } from "@/app/i18n/client";

export const SettingsItem = () => {
  const { t } = useTranslation("app-bar");
  const router = useRouterLocale();

  const handleNavigate = () => {
    router.push(`/social/profile/settings`);
  };

  return (
    <li
      className='flex gap-x-2 px-4 py-2 items-center text-sm hover:bg-violet-500 cursor-pointer hover:text-white'
      onClick={handleNavigate}>
      <Settings className='w-5 h-5' />
      {t("settings")}
    </li>
  );
};
