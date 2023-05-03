import { FC } from "react";

interface ArrowDownIconProps {
  className?: string;
}

const ArrowDownIcon: FC<ArrowDownIconProps> = ({ className = "" }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`w-6 h-6 ${className}`}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
      />
    </svg>
  );
};

export default ArrowDownIcon;
