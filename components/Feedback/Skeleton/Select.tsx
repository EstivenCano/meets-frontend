import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export const Select: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ ...props }) => {
  return (
    <div
      className={`w-24 h-4 bg-gray-600/40 animate-pulse rounded-md ${props.className}`}
      {...props}></div>
  );
};
