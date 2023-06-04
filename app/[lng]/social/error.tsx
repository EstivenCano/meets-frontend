"use client";

import { MeetsTitle } from "@/components/Display/MeetsTitle";
import { Button } from "@/components/Inputs/Button";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  // Refresh the page
  const refresh = () => {
    window.location.reload();
  };

  return (
    <main className='flex flex-col items-left justify-center h-screen gap-y-8 px-4 max-w-lg m-auto'>
      <MeetsTitle className='text-center' />
      <h1 className='text-2xl font-bold'>
        Something went wrong, please try again later.
      </h1>
      <p className='text-lg font-semibold'>
        If the problem persists, contact us.
      </p>
      <div className='flex flex-wrap overflow-auto w-70 border-2 border-red-600/30 p-2'>
        <p className='text-sm'>{"Here's the error message:"}</p>
        <p className='text-xl text-red-600'>{error.message}</p>
      </div>
      <Button onClick={refresh} size='md'>
        Refresh
      </Button>
    </main>
  );
};

export default ErrorState;
