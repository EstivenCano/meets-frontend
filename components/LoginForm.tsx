"use client";

import { Button } from "@/components/Button";
import Image from "next/image";
import { TextField } from "@/components/TextField";
import { Link } from "@/components/Link";
import { post } from "../services/api/serviceClient";
import { useRef } from "react";

const LoginSection = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const login = async () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await post("/auth/signin", {
        email,
        password,
      });

      console.log("LoginForm: ", response);
    } catch (error) {
      console.log("LoginForm Error: ", error);
    }
  };

  return (
    <section className='w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center space-y-6 py-10'>
      <h2 className='text-lg font-semibold'>Sign in with your account</h2>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className='flex flex-col items-center justify-center space-y-4 w-72'>
        <TextField
          name='email'
          label='email'
          type='email'
          placeholder='Email'
          required
        />
        <TextField
          name='password'
          label='password'
          type='password'
          placeholder='Password'
          required
        />
        <Button color='green' size='auto'>
          Sign in
        </Button>
      </form>
      <div className='flex items-center space-x-4'>
        <div className='w-20 h-0.5 bg-violet-600' />
        <p className='text-lg font-semibold'>Or</p>
        <div className='w-20 h-0.5 bg-violet-600' />
      </div>
      <Button size='md' type='submit'>
        <Image src='google.svg' alt='Google icon' width={20} height={20} />
        <span>Sign in with Google</span>
      </Button>
      <p className='text-lg font-semibold'>
        {"Don't have an account? "}
        <Link href='/signup'>Sign up</Link>
      </p>
      <p className='text-lg font-semibold'>
        <Link href='/reset-password'>Forgot password?</Link>
      </p>
      <p className='text-xs'>@2023 Meets. All rights reserved.</p>
    </section>
  );
};

export default LoginSection;
