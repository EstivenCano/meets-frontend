import { Loading } from "@/public/icons";

export const RedirectScreen = () => {
  return (
    <div className='flex items-center gap-x-2 justify-center w-full h-screen'>
      <Loading className='w-12 h-12 stroke-current' />
      <p className='text-md font-semibold'>Redirecting</p>
    </div>
  );
};
