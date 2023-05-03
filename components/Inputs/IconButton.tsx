import Image, { StaticImageData } from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import { match } from "ts-pattern";

interface IconButtonProps {
  icon: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  name: string;
  className?: string;
  onClick?: () => void;
}

export const IconButton: FC<
  IconButtonProps &
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({ icon, name, size = "md", className, onClick, ...props }) => {
  const sizeClass = match(size)
    .with("xs", () => "w-6 h-6")
    .with("sm", () => "w-8 h-8")
    .with("md", () => "w-10 h-10")
    .with("lg", () => "w-12 h-12")
    .exhaustive();

  return (
    <button
      data-tooltip={name}
      className={`relative rounded-full flex items-center justify-center w-10 h-10 bg-gray-500/40 hover:bg-gray-500/80 active:scale-90 ${sizeClass} ${className}`}
      onClick={onClick}
      {...props}>
      {icon}
    </button>
  );
};
