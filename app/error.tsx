"use client";

import { Button } from "@/components/Inputs/Button";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
  refresh?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, refresh }) => {
  useEffect(() => {
    console.log(error);
    console.error(error);
  }, [error]);

  console.log(error.message);

  return (
    <main className='flex flex-col items-center justify-center h-screen gap-y-4'>
      <h1 className='text-4xl font-bold'>Error</h1>
      <p className='text-xl'>{error.message}</p>
      {refresh && <Button onClick={refresh}>Refresh</Button>}
    </main>
  );
};

export default ErrorState;
