import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface IconButtonProps {
  icon: StaticImageData | string;
  name: string;
  className?: string;
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = ({
  icon,
  name,
  className,
  onClick,
}) => {
  return (
    <button
      data-tooltip={name}
      className={`p-2 rounded-full flex items-center justify-center w-10 h-10 bg-gray-500/40 hover:bg-gray-500/80 active:scale-90 ${className}`}
      onClick={onClick}>
      <Image src={icon} alt={name} width={20} height={20} className='invert' />
    </button>
  );
};
