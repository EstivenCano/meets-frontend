import { useTranslation } from "@/app/i18n";
import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import { verifyResetToken } from "@/services/auth.service";
import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(
  () => import("@/components/Forms/ResetPasswordForm")
);

export default async function ResetPassword({
  searchParams,
  params: { lng },
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "reset-password");
  const token = searchParams?.token as string;
  const id = searchParams?.id as string;

  const isValidLink = await verifyResetToken(token, id);

  if (!isValidLink) {
    return (
      <div className='flex flex-col space-y-4 justify-center items-center'>
        <h2 className='text-center'>{t("invalidLink")}</h2>
        <div className='flex items-center space-x-4'>
          <div className='w-20 h-0.5 bg-violet-600' />
          <p className='text-lg font-semibold'>{t("or")}</p>
          <div className='w-20 h-0.5 bg-violet-600' />
        </div>
        <Link href='/auth/request-reset-password'>
          <Button size='md'>{t("requestNewLink")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
      <h2 className='text-lg font-semibold'>{t("resetYourPassword")}</h2>
      <ResetPasswordForm token={token} userId={id} />
    </div>
  );
}
