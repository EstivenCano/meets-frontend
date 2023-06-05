import { useTranslation } from "@/app/i18n/client";
import { Loading } from "@/public/icons";

export const NoFeed = () => {
  const { t } = useTranslation("feed");

  setTimeout(() => {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full gap-y-4'>
        <h2 className='text-xl font-bold'>
          {t("welcome")} <span className='text-violet-400'>Meets</span>
        </h2>
        <p className='text-sm text-gray-500 text-center'>{t("noFeed")}</p>
      </div>
    );
  }, 1000);

  return <Loading />;
};
