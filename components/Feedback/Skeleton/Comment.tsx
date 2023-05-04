import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export const Comment: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ ...props }) => {
  return (
    <div
      className='relative flex p-4 py-1 w-full h-32 max-w-6xl rounded-xl overflow-hidden bg-gray-500/20 animate-pulse'
      {...props}>
      <span className='w-12 h-12 mt-2 bg-gray-600/40  animate-pulse rounded-full'></span>
      <div className='flex flex-col mt-2 gap-y-2 w-full px-2'>
        <span className='w-1/2 h-3 bg-gray-600/40 animate-pulse rounded mt-2'></span>
        <span className='w-1/4 h-3 bg-gray-600/40 animate-pulse rounded'></span>
      </div>
      <div className='absolute top-3/4 left-4 flex w-full'>
        <span className='w-3/4 h-4 bg-gray-600/40 animate-pulse rounded'></span>
      </div>
    </div>
  );
};
