import { Settings as SettingsIcon } from "@/public/icons";
import { Link } from "@/components/Navigation/Link";
import dynamic from "next/dynamic";
import Skeleton from "@/components/Feedback/Skeleton";
import { useTranslation } from "@/app/i18n";
import DeleteUserForm from "@/components/Forms/DeleteUser";

const ChangeTheme = dynamic(() => import("@/components/Forms/ChangeTheme"), {
  loading: () => <Skeleton type='select' />,
});

const ChangeLocale = dynamic(() => import("@/components/Forms/ChangeLocale"), {
  loading: () => <Skeleton type='select' />,
});

export default async function Settings({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "settings");

  return (
    <section className='flex flex-col w-full my-4 rounded-md max-w-2xl p-4 bg-background h-full overflow-y-auto'>
      <div className='flex gap-x-2'>
        <SettingsIcon className='w-5 h-5' />
        <h1 className='text-md'>{t("settings")}</h1>
      </div>
      <hr className='border-violet-400 w-full my-4' />
      <h2 className='text-sm font-bold mb-2'>{t("general")}</h2>
      <ul className='flex flex-col gap-y-2'>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          {t("language")}: <ChangeLocale />
        </li>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          {t("theme")}: <ChangeTheme />
        </li>
      </ul>
      <hr className='border-violet-400 w-full my-4' />
      <h2 className='text-sm font-bold mb-2'>{t("account")}</h2>
      <ul className='flex flex-col gap-y-2'>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          <Link href='/auth/request-reset-password'>{t("changePassword")}</Link>
        </li>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm text-red-500 font-semibold'>
          <DeleteUserForm />
        </li>
      </ul>
      <hr className='border-violet-400 w-full my-4' />
      <h2 className='text-sm font-bold mb-2'>{t("about")}</h2>
      <ul className='flex flex-col gap-y-2'>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          {t("aboutMeets")}
        </li>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          {t("contact")}
        </li>
      </ul>
    </section>
  );
}
