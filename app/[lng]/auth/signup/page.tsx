import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import dynamic from "next/dynamic";
import { Google } from "@/public/icons";

const SignupForm = dynamic(() => import("@/components/Forms/SignupForm"));
const NotUserGuard = dynamic(() => import("@/components/Guards/NotUserGuard"));

export default function Signup() {
  return (
    <NotUserGuard>
      <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
        <h2 className='text-lg font-semibold'>Sign up with your account</h2>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <SignupForm />
          <div className='flex items-center space-x-4'>
            <div className='w-20 h-0.5 bg-violet-600' />
            <p className='text-lg font-semibold'>Or</p>
            <div className='w-20 h-0.5 bg-violet-600' />
          </div>
          <Button size='md'>
            <Google className='w-5 h-5' />
            <span>Sign up with Google</span>
          </Button>
          <p className='text-lg font-semibold'>
            {"Already have an account? "}
            <Link href='/'>Sign in</Link>
          </p>
        </div>
      </div>
    </NotUserGuard>
  );
}
