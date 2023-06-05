import { ProfileImage } from "@/components/Display/ProfileImage";
import { MeetsTitle } from "@/components/Display/MeetsTitle";
import { LoadingBar } from "@/components/Feedback/LoadingBar";
import dynamic from "next/dynamic";
import { Link } from "@/components/Navigation/Link";
import { useTranslation } from "../i18n";
import Skeleton from "@/components/Feedback/Skeleton";
import { AuthGoogle } from "@/components/Forms/AuthGoogle";

const LoginForm = dynamic(() => import("@/components/Forms/LoginForm"), {
  loading: () => <Skeleton type='form' numberOfFields={2} className='w-72' />,
});

const NotUserGuard = dynamic(() => import("@/components/Guards/NotUserGuard"), {
  loading: () => (
    <div className='h-full w-full flex flex-col items-center justify-center gap-1'>
      <MeetsTitle size='md' className='animate-pulse' />
    </div>
  ),
  ssr: false,
});

const TitleSection = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "common");
  return (
    <section className='hidden md:flex w-full md:w-2/3 h-full flex-col items-center justify-center space-y-1 py-4 bg-gradient-to-b md:bg-gradient-to-tr from-background via-violet-600/20 to-background shadow-lg shadow-violet-500 lg:rounded-r-full'>
      <MeetsTitle size='lg' />
      <h2 className='text-lg font-semibold text-center'>{t("slogan")}</h2>
      <LoadingBar />
      <div className='flex-row gap-x-4 md:gap-x-8 gap-y-4 py-28 flex flex-wrap justify-center px-2'>
        <ProfileImage
          src='https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Mia'
          alt='Profile picture of user 1'
          size='lg'
          className='animate-[bounce_4s_ease-in-out_infinite_0s] translate-y-[-25%]'
        />
        <ProfileImage
          src='https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Mimi'
          alt='Profile picture of user 2'
          size='lg'
          state='online'
          className='animate-[bounce_4s_ease-in-out_infinite_0.5s] translate-y-[-25%]'
        />
        <ProfileImage
          src='https://api.dicebear.com/6.x/shapes/svg?seed=Harley'
          alt='Profile picture of user 3'
          size='lg'
          className='animate-[bounce_4s_ease-in-out_infinite_1s] translate-y-[-25%]'
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
    <section className='flex w-full md:w-1/2 h-full flex-col items-center justify-center space-y-6 py-10'>
      <MeetsTitle size='lg' className='visible md:hidden' />
      <h2 className='text-lg font-semibold text-center'>{t("title")}</h2>
      <LoginForm />
      <div className='flex items-center space-x-4'>
        <div className='w-20 h-0.5 bg-violet-600' />
        <p className='text-lg font-semibold'>{t("or")}</p>
        <div className='w-20 h-0.5 bg-violet-600' />
      </div>
      <AuthGoogle>
        <span>{t("signInGoogle")}</span>
      </AuthGoogle>
      <p className='text-lg font-semibold text-center'>
        {t("noAccount")} <Link href='/auth/signup'>{t("signUp")}</Link>
      </p>
      <p className='text-lg font-semibold text-center'>
        <Link href='/auth/request-reset-password'>{t("forgotPassword")}</Link>
      </p>
      <p className='text-xs text-center'>{t("allRightsReserved")}</p>
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
      <main className='relative flex overflow-x-hidden max-w-screen h-full max-h-full md:flex-row flex-col'>
        {/* @ts-expect-error Server Component */}
        <TitleSection lng={lng} />
        {/* @ts-expect-error Server Component */}
        <LoginSection lng={lng} />
      </main>
    </NotUserGuard>
  );
}
