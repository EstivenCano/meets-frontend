import { FC } from "react";

interface LoadingIconProps {
  className?: string;
}

const LoadingIcon: FC<LoadingIconProps> = ({ className = "" }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      className={`w-6 h-6 ${className}`}>
      <circle
        cx='50'
        cy='50'
        fill='none'
        stroke-width='5'
        r='35'
        stroke-dasharray='164.93361431346415 56.97787143782138'>
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          values='0 50 50;360 50 50'
          keyTimes='0;1'></animateTransform>
      </circle>
    </svg>
  );
};

export default LoadingIcon;
