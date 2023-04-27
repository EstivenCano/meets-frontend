import { useRef, forwardRef } from "react";

import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";
import { match } from "ts-pattern";
import { shimmerToBase64 } from "@/utils/shimmer";

interface RadioImageProps {
  src: string;
  shape?: "circle" | "square" | "rectangle";
  size?: "sm" | "md" | "lg";
  defaultChecked?: boolean;
}

export const RadioImage = forwardRef<
  HTMLInputElement,
  RadioImageProps & UseFormRegisterReturn<"picture" | "cover">
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    src,
    shape = "circle",
    size = "sm",
    defaultChecked,
    onChange,
    onBlur,
    name,
  } = props;

  const shapeClass = match(shape)
    .with("circle", () => "rounded-full")
    .otherwise(() => "rounded-md");

  const rectangleSizeClass = match(size)
    .with("sm", () => "w-32 h-12")
    .with("md", () => "w-48 h-16")
    .with("lg", () => "w-64 h-20")
    .exhaustive();

  const sizeClass = match(shape)
    .with("rectangle", () => rectangleSizeClass)
    .otherwise(() =>
      match(size)
        .with("sm", () => "w-12 h-12")
        .with("md", () => "w-16 h-16")
        .with("lg", () => "w-20 h-20")
        .exhaustive()
    );

  return (
    <div ref={ref} className={`relative ${shapeClass}`}>
      <input
        ref={inputRef}
        type='radio'
        name={name}
        onChange={onChange}
        value={src}
        defaultChecked={defaultChecked}
        onBlur={onBlur}
        id={`avatar=${src}`}
        className={`appearance-none checked:border-8 checked:border-violet-500 ${sizeClass} ${shapeClass}`}
      />
      <Image
        src={src}
        onClick={() => inputRef.current?.click()}
        alt={name}
        sizes='100vw'
        width={40}
        height={40}
        placeholder='blur'
        blurDataURL={`data:image/svg+xml;base64,${shimmerToBase64(100, 100)}`}
        className={`absolute inset-0 p-1 cursor-pointer active:scale-90 $ ${sizeClass} ${shapeClass}`}
      />
    </div>
  );
});

RadioImage.displayName = "RadioImage";
