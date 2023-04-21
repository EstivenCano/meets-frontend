import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";
import { Link } from "@/components/Navigation/Link";

export default function ResetPassword({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const token = searchParams?.token;
  const id = searchParams?.id;

  if (!token && !id) {
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

      <form className='flex flex-col items-center justify-center space-y-4 w-72'>
        <TextField
          name='newPassword'
          type='password'
          placeholder='New Password'
          // error={formErrors.password?.message}
          // {...register("password")}
        />
        <TextField
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          // error={formErrors.confirmPassword?.message}
          // {...register("confirmPassword")}
        />
        <Button color='green' type='submit'>
          Reset password
        </Button>
      </form>
    </div>
  );
}
