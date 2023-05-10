import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface FormLoadingProps {
  numberOfFields?: number;
}

export const FormLoading: FC<
  FormLoadingProps &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ numberOfFields = 3, ...props }) => {
  return (
    <div
      className='flex flex-col p-4 w-full h-max max-w-6xl rounded-xl overflow-hidden bg-gray-500/20 animate-pulse'
      {...props}>
      {Array.from({ length: numberOfFields }).map((_, i) => (
        <div
          key={i}
          className={`w-full h-12 my-4 bg-gray-600/40 animate-pulse rounded-md`}
        />
      ))}
    </div>
  );
};
