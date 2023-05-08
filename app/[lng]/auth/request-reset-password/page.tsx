import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import dynamic from "next/dynamic";

const RequestResetPasswordForm = dynamic(
  () => import("@/components/Forms/RequestResetPasswordForm")
);

export default function RequestResetPassword() {
  return (
    <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
      <h2 className='text-lg font-semibold'>Reset your password</h2>
      <RequestResetPasswordForm />
      <p className='text-lg font-semibold py-5'>
        {"Don't have an account? "}
        <Link href='/auth/signup'>Sign up</Link>
      </p>
      <Link href='/'>
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
