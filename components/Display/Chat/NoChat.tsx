import { useTranslation } from "@/app/i18n/client";

export const NoChat = () => {
  const { t } = useTranslation("chat");

  return (
    <div className='hidden md:flex flex-col items-center w-full h-full justify-center gap-y-4 px-4'>
      <h2 className='text-xl font-bold'>{t("noChatSelected")}</h2>
      <p className='text-center'>{t("noChatMessage")}</p>
    </div>
  );
};
