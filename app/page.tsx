import { ProfileImage } from "@/components/Display/ProfileImage";
import { MeetsTitle } from "@/components/Display/MeetsTitle";
import { LoadingBar } from "@/components/Feedback/LoadingBar";
import dynamic from "next/dynamic";
import { Button } from "@/components/Inputs/Button";
import { Link } from "@/components/Navigation/Link";
import Image from "next/image";
import GoogleIcon from "@/public/google.svg";

const LoginForm = dynamic(() => import("@/components/Forms/LoginForm"));

const TitleSection = () => {
  return (
    <section className='w-full md:w-2/3 min-h-screen flex flex-col items-center justify-center space-y-1 py-4 bg-gradient-to-b md:bg-gradient-to-tr from-background via-violet-600/20 to-background shadow-lg shadow-violet-500 lg:rounded-r-full'>
      <MeetsTitle size='lg' />
      <h2 className='text-lg font-semibold text-center'>Share what you are</h2>
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
        <span className='text-violet-600'>#</span>Meet
        <span className='text-green-600'>#</span>Share
        <span className='text-violet-600'>#</span>Connect
      </p>
    </section>
  );
};

const LoginSection = () => {
  return (
    <section className='w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center space-y-6 py-10'>
      <h2 className='text-lg font-semibold'>Sign in with your account</h2>
      <LoginForm />
      <div className='flex items-center space-x-4'>
        <div className='w-20 h-0.5 bg-violet-600' />
        <p className='text-lg font-semibold'>Or</p>
        <div className='w-20 h-0.5 bg-violet-600' />
      </div>
      <Button size='md' type='submit'>
        <Image src={GoogleIcon} alt='Google icon' width={20} height={20} />
        <span>Sign in with Google</span>
      </Button>
      <p className='text-lg font-semibold'>
        {"Don't have an account? "}
        <Link href='/auth/signup'>Sign up</Link>
      </p>
      <p className='text-lg font-semibold'>
        <Link href='/auth/request-reset-password'>Forgot password?</Link>
      </p>
      <p className='text-xs'>@2023 Meets. All rights reserved.</p>
    </section>
  );
};

export default function Home() {
  return (
    <main className='relative flex overflow-x-hidden max-w-screen min-h-screen md:flex-row flex-col'>
      <TitleSection />
      <LoginSection />
    </main>
  );
}
