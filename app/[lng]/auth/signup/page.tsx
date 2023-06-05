import { Link } from "@/components/Navigation/Link";
import dynamic from "next/dynamic";
import { useTranslation } from "@/app/i18n";
import Skeleton from "@/components/Feedback/Skeleton";
import { AuthGoogle } from "@/components/Forms/AuthGoogle";
import { MeetsTitle } from "@/components/Display/MeetsTitle";

const SignupForm = dynamic(() => import("@/components/Forms/SignupForm"), {
  loading: () => <Skeleton type='form' numberOfFields={5} className='w-72' />,
});

const NotUserGuard = dynamic(() => import("@/components/Guards/NotUserGuard"), {
  loading: () => (
    <div className='h-full w-full flex flex-col items-center justify-center gap-1'>
      <MeetsTitle size='md' className='animate-pulse' />
    </div>
  ),
  ssr: false,
});

export default async function Signup({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "signup");
  return (
    <NotUserGuard>
      <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
        <h2 className='text-lg text-center font-semibold'>{t("title")}</h2>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <SignupForm />
          <div className='flex items-center space-x-4'>
            <div className='w-20 h-0.5 bg-violet-600' />
            <p className='text-lg font-semibold'>{t("or")}</p>
            <div className='w-20 h-0.5 bg-violet-600' />
          </div>
          <AuthGoogle>
            <span>{t("signUpGoogle")}</span>
          </AuthGoogle>
          <p className='text-lg font-semibold text-center'>
            {t("haveAccount")} <Link href='/'>{t("signIn")}</Link>
          </p>
        </div>
      </div>
    </NotUserGuard>
  );
}
