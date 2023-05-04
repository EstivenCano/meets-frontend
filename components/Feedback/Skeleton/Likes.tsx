import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export const Likes: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ ...props }) => {
  return (
    <div
      className='relative flex px-4 py-1 w-full h-16 max-w-xs rounded-xl overflow-hidden bg-gray-500/20 animate-pulse'
      {...props}>
      <span className='w-12 h-12 mt-1 bg-gray-600/40 animate-pulse rounded-full'></span>
      <div className='flex flex-col mt-3 gap-y-2 w-full px-2'>
        <span className='w-2/3 h-3 bg-gray-600/40 animate-pulse rounded mt-2'></span>
      </div>
    </div>
  );
};
