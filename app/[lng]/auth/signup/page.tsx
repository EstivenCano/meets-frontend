import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import dynamic from "next/dynamic";
import { Google } from "@/public/icons";
import { useTranslation } from "@/app/i18n";
import Skeleton from "@/components/Feedback/Skeleton";

const SignupForm = dynamic(() => import("@/components/Forms/SignupForm"), {
  loading: () => <Skeleton type='form' numberOfFields={4} className='w-72' />,
});
const NotUserGuard = dynamic(() => import("@/components/Guards/NotUserGuard"));

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
          <Button size='md'>
            <Google className='w-5 h-5' />
            <span>{t("signUpGoogle")}</span>
          </Button>
          <p className='text-lg font-semibold'>
            {t("haveAccount")} <Link href='/'>{t("signIn")}</Link>
          </p>
        </div>
      </div>
    </NotUserGuard>
  );
}
