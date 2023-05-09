"use client";

import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const { t } = useTranslation("reset-password");
  return (
    <>
      <div className='flex flex-col py-4 space-y-4 justify-center items-center'>
        <h1 className='text-xl font-extrabold text-red-500'>{error.name}</h1>
        <h2>{t("invalidLink")}</h2>
        <div className='flex items-center space-x-4'>
          <div className='w-20 h-0.5 bg-violet-600' />
          <p className='text-lg font-semibold'>{t("or")}</p>
          <div className='w-20 h-0.5 bg-violet-600' />
        </div>
        <Link href='/auth/request-reset-password'>
          <Button size='md'>{t("requestNewLink")}</Button>
        </Link>
      </div>
    </>
  );
};

export default ErrorState;
