import { Loading } from "@/public/icons";
import { FC } from "react";

interface RedirectScreenProps {
  text?: string;
}

export const RedirectScreen: FC<RedirectScreenProps> = ({
  text = "Redirecting",
}) => {
  return (
    <div className='flex items-center gap-x-2 justify-center w-full h-screen'>
      <Loading className='w-12 h-12 stroke-current' />
      <p className='text-md font-semibold'>{text}</p>
    </div>
  );
};
