import { useRef, forwardRef } from "react";

import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";

interface AvatarInputProps {
  src: string;
  defaultChecked?: boolean;
}

export const AvatarInput = forwardRef<
  HTMLInputElement,
  AvatarInputProps & UseFormRegisterReturn<"picture">
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { src, defaultChecked, onChange, onBlur, name } = props;

  return (
    <div ref={ref} className='relative'>
      <input
        ref={inputRef}
        type='radio'
        name={name}
        onChange={onChange}
        value={src}
        defaultChecked={defaultChecked}
        onBlur={onBlur}
        id={`avatar=${src}`}
        className='appearance-none w-12 h-12 rounded-full checked:border-4 checked:border-violet-500'
      />
      <Image
        src={src}
        onClick={() => inputRef.current?.click()}
        alt='Picture of the author'
        sizes='100vw'
        className={`absolute inset-1 rounded-full cursor-pointer active:scale-90`}
        width={40}
        height={40}
      />
    </div>
  );
});

AvatarInput.displayName = "AvatarInput";
