import { FC } from "react";
import Image, { ImageProps } from "next/image";
import { match } from "ts-pattern";

interface ProfileImageProps {
  className?: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  props?: ImageProps;
  state?: "online" | "offline";
}

const defaultProfileImage =
  "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Mia";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#888" offset="20%" />
      <stop stop-color="#555" offset="50%" />
      <stop stop-color="#888" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const ProfileImage: FC<ProfileImageProps & ImageProps> = ({
  src,
  alt,
  className,
  size = "md",
  state = "offline",
  ...props
}) => {
  const sizeClass = match(size)
    .with("xxs", () => "w-10 h-10 md:w-12 md:h-12")
    .with("xs", () => "w-12 h-12 md:w-16 md:h-16")
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
        src={src || defaultProfileImage}
        alt={alt}
        fill
        sizes='100vw'
        placeholder='blur'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(100, 100))}`}
        className={`rounded-full border-2 ${colorClass} shadow-md shadow-violet-200 hover:scale-105 transform transition-all duration-500 ease-in-out ${className}`}
      />
    </span>
  );
};
