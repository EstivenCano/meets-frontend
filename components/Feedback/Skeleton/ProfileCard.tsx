import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export const ProfileCardLoading: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ ...props }) => {
  return (
    <div
      className='relative flex p-4 w-full h-96 md:h-64 max-w-6xl rounded-xl overflow-hidden bg-gray-500/20 animate-pulse'
      {...props}>
      <span className='w-32 h-32 mt-16 bg-gray-600/40  animate-pulse rounded-full'></span>
    </div>
  );
};
