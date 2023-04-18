import { FC } from "react";
import Image, { ImageProps } from "next/image";
import { match } from "ts-pattern";

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  props?: ImageProps;
  state?: "online" | "offline";
}

export const ProfileImage: FC<ProfileImageProps & ImageProps> = ({
  src,
  alt,
  className,
  size = "md",
  state = "offline",
  ...props
}) => {
  const sizeClass = match(size)
    .with("sm", () => "w-16 h-16 md:w-20 md:h-20")
    .with("md", () => "w-24 h-24 md:w-28 md:h-28")
    .with("lg", () => "w-28 h-28 md:w-32 md:h-32")
    .exhaustive();

  const colorClass = match(state)
    .with("online", () => "border-green-600")
    .with("offline", () => "border-violet-600")
    .exhaustive();

  return (
    <span className={`relative ${sizeClass}`}>
      <Image
        {...props}
        src={src}
        alt={alt}
        className={`rounded-full border-2 ${colorClass} shadow-md shadow-violet-200 hover:scale-105 transform transition-all duration-500 ease-in-out ${className}`}
        sizes='100vw'
        fill
      />
    </span>
  );
};
