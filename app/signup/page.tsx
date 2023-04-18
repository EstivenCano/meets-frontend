import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { Link } from "@/components/Link";
import Image from "next/image";

export default function Signup() {
  return (
    <main className='flex flex-col min-h-screen justify-center items-center bg-gradient-to-tr from-violet-600/20 via-background to-violet-600/20'>
      <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
        <h2 className='text-lg font-semibold'>Sign up with your account</h2>
        <form className='flex flex-col items-center justify-center space-y-4 w-72'>
          <TextField label='email' type='email' placeholder='Email' />
          <TextField label='password' type='password' placeholder='Password' />
          <TextField
            label='confirm password'
            type='password'
            placeholder='Confirm password'
          />
          <Button color='green' size='auto'>
            Sign up
          </Button>
        </form>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <div className='flex items-center space-x-4'>
            <div className='w-20 h-0.5 bg-violet-600' />
            <p className='text-lg font-semibold'>Or</p>
            <div className='w-20 h-0.5 bg-violet-600' />
          </div>
          <Button size='md'>
            <Image src='google.svg' alt='Google icon' width={20} height={20} />
            <span>Sign up with Google</span>
          </Button>
          <p className='text-lg font-semibold'>
            {"Already have an account? "}
            <Link href='/'>Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
