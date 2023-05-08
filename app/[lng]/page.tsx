import { ProfileImage } from "@/components/Display/ProfileImage";
import { MeetsTitle } from "@/components/Display/MeetsTitle";
import { LoadingBar } from "@/components/Feedback/LoadingBar";
import dynamic from "next/dynamic";
import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import NotUserGuard from "@/components/Guards/NotUserGuard";
import { Google } from "@/public/icons";
import { useTranslation } from "../i18n";
import Skeleton from "@/components/Feedback/Skeleton";

const LoginForm = dynamic(() => import("@/components/Forms/LoginForm"), {
  loading: () => <Skeleton type='form' numberOfFields={2} className='w-72' />,
});

const TitleSection = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "title");
  return (
    <section className='hidden md:flex w-full md:w-2/3 min-h-screen flex-col items-center justify-center space-y-1 py-4 bg-gradient-to-b md:bg-gradient-to-tr from-background via-violet-600/20 to-background shadow-lg shadow-violet-500 lg:rounded-r-full'>
      <MeetsTitle size='lg' />
      <h2 className='text-lg font-semibold text-center'>{t("slogan")}</h2>
      <LoadingBar />
      <div className='flex-row gap-x-4 md:gap-x-8 gap-y-4 py-28 flex flex-wrap justify-center px-2'>
        <ProfileImage
          src='https://i.pravatar.cc/280?img=38'
          alt='Profile picture of user 38'
          size='lg'
        />
        <ProfileImage
          src='https://i.pravatar.cc/280?img=24'
          alt='Profile picture of user 24'
          size='lg'
          state='online'
        />
        <ProfileImage
          src='https://i.pravatar.cc/280?img=11'
          alt='Profile picture of user 11'
          size='lg'
        />
      </div>
      <p className={`text-lg font-semibold space-x-6`}>
        <span className='text-violet-600'>#</span>
        {t("meet")}
        <span className='text-green-600'>#</span>
        {t("share")}
        <span className='text-violet-600'>#</span>
        {t("connect")}
      </p>
    </section>
  );
};

const LoginSection = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "login");

  return (
    <section className='flex w-full md:w-1/2 min-h-screen flex-col items-center justify-center space-y-6 py-10'>
      <MeetsTitle size='lg' className='visible md:hidden' />
      <h2 className='text-lg font-semibold'>{t("title")}</h2>
      <LoginForm />
      <div className='flex items-center space-x-4'>
        <div className='w-20 h-0.5 bg-violet-600' />
        <p className='text-lg font-semibold'>{t("or")}</p>
        <div className='w-20 h-0.5 bg-violet-600' />
      </div>
      <Button size='md' type='submit'>
        <Google className='w-5 h-5' />
        <span>{t("signInGoogle")}</span>
      </Button>
      <p className='text-lg font-semibold'>
        {t("noAccount")} <Link href='/auth/signup'>{t("signUp")}</Link>
      </p>
      <p className='text-lg font-semibold'>
        <Link href='/auth/request-reset-password'>{t("forgotPassword")}</Link>
      </p>
      <p className='text-xs'>{t("allRightsReserved")}</p>
    </section>
  );
};

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  return (
    <NotUserGuard>
      <main className='relative flex overflow-x-hidden max-w-screen min-h-screen md:flex-row flex-col'>
        {/* @ts-expect-error Server Component */}
        <TitleSection lng={lng} />
        {/* @ts-expect-error Server Component */}
        <LoginSection lng={lng} />
      </main>
    </NotUserGuard>
  );
}
