import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileIcon from "@/public/profile.svg";
import { FC } from "react";

interface ProfileItemProps {
  id?: string;
}

export const ProfileItem: FC<ProfileItemProps> = ({ id }) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (!id) return;
    router.push(`/social/profile/${id}`);
  };

  return (
    <li
      className='flex gap-x-2 px-4 py-2 text-sm hover:bg-violet-500 cursor-pointer hover:text-white'
      onClick={handleNavigate}>
      <Image
        src={ProfileIcon}
        alt='Profile icon'
        width={20}
        height={20}
        className='dark:invert'
      />
      Your Profile
    </li>
  );
};
