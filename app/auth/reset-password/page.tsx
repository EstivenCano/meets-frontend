import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import { verifyResetToken } from "@/services/auth.service";
import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(
  () => import("@/components/Forms/ResetPasswordForm")
);

export default async function ResetPassword({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const token = searchParams?.token as string;
  const id = searchParams?.id as string;

  const isValidLink = await verifyResetToken(token, id);

  if (!isValidLink) {
    return (
      <div className='flex flex-col space-y-4 justify-center items-center'>
        <h2>
          This is a not valid link. Please, check your email and try again.
        </h2>
        <div className='flex items-center space-x-4'>
          <div className='w-20 h-0.5 bg-violet-600' />
          <p className='text-lg font-semibold'>Or</p>
          <div className='w-20 h-0.5 bg-violet-600' />
        </div>
        <Link href='/auth/request-reset-password'>
          <Button size='md'>Request a new link</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
      <h2 className='text-lg font-semibold'>Reset your password</h2>
      <ResetPasswordForm token={token} userId={id} />
    </div>
  );
}
