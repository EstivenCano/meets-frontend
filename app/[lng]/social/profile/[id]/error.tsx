"use client";

import { Button } from "@/components/Inputs/Button";
import { useRouterLocale } from "@/hooks/useRouter";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const router = useRouterLocale();

  const goHome = () => {
    router.push("/social/feed");
  };

  return (
    <main className='flex flex-col items-left justify-center h-screen gap-y-8 max-w-lg m-auto'>
      <h1 className='text-2xl font-bold'>Something went wrong</h1>
      <p className='text-lg font-semibold'>
        {
          "Maybe the profile doesn't exist or you don't have permission to view it."
        }
      </p>
      <div className='w-70 border-2 border-red-600/30 p-2'>
        <p className='text-sm'>{"Here's the error message:"}</p>
        <p className='text-xl text-red-600'>{error.message}</p>
      </div>
      <Button onClick={goHome} size='md'>
        Go home
      </Button>
    </main>
  );
};

export default ErrorState;
