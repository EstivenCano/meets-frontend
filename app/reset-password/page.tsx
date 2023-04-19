import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { Link } from "@/components/Link";

export default function ResetPassword() {
  return (
    <main className='flex flex-col min-h-screen justify-center items-center bg-gradient-to-tr from-violet-600/20 via-background to-violet-600/20'>
      <div className='flex flex-col items-center justify-center space-y-4 px-20 py-10'>
        <h2 className='text-lg font-semibold'>Reset your password</h2>
        <form className='flex flex-col items-center justify-center space-y-4 w-72'>
          <TextField label='email' type='email' placeholder='Email' required />
          <Button color='green'>Reset password</Button>
        </form>
        <p className='text-lg font-semibold py-5'>
          {"Don't have an account? "}
          <Link href='/signup'>Sign up</Link>
        </p>
        <Link href='/'>
          <Button>Back to home</Button>
        </Link>
      </div>
    </main>
  );
}
