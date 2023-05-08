import { useTranslation } from "@/app/i18n";
import Skeleton from "@/components/Feedback/Skeleton";
import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import dynamic from "next/dynamic";

const RequestResetPasswordForm = dynamic(
  () => import("@/components/Forms/RequestResetPasswordForm"),
  {
    loading: () => <Skeleton type='form' numberOfFields={1} />,
  }
);

export default async function RequestResetPassword({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "request-reset");

  return (
    <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
      <h2 className='text-lg font-semibold'>{t("title")}</h2>
      <RequestResetPasswordForm />
      <p className='text-lg font-semibold py-5'>
        {t("noAccount")} <Link href='/auth/signup'>{t("signUp")}</Link>
      </p>
      <Link href='/'>
        <Button>{t("backHome")}</Button>
      </Link>
    </div>
  );
}
