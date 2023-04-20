"use client";

import { Button } from "@/components/Inputs/Button";
import { TextField } from "@/components/Inputs/TextField";

const SignupForm = () => {
  return (
    <form className='flex flex-col items-center justify-center space-y-4 w-72'>
      <TextField name='email' type='email' placeholder='Email' required />
      <TextField
        name='password'
        type='password'
        placeholder='Password'
        required
      />
      <TextField
        name='confirmPassword'
        type='password'
        placeholder='Confirm password'
        required
      />
      <Button color='green' size='auto'>
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
