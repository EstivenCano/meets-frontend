import { useRouter } from "next/navigation";
import { FC } from "react";
import { Profile } from "@/public/icons";

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
      <Profile className='w-5 h-5' />
      Your Profile
    </li>
  );
};
