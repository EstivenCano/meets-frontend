import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileIcon from "@/public/profile.svg";

export const ProfileItem = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/social/profile");
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
