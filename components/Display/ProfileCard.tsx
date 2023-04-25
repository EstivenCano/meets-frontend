"use client";

import { userStore } from "@/stores/useUser.store";
import { ProfileImage } from "./ProfileImage";
import Image from "next/image";

const ProfileCard = () => {
  const user = userStore((state) => state.user);

  return (
    <section
      title='Profile'
      className='relative flex bg-violet-500/30 w-full h-96 md:h-64 max-w-6xl rounded-xl overflow-hidden'>
      <div className='absolute bg-gray-400/30 h-40 w-full rounded-xl'>
        <Image
          src='https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Willow'
          fill
          style={{
            objectFit: "cover",
          }}
          className='rounded-xl'
          alt='Cover image'
        />
      </div>
      <ProfileImage
        src={
          user?.picture ||
          "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Mia"
        }
        size='lg'
        state='online'
        alt="User's profile image"
        className='mt-20 mx-4 min-w-max'
      />
      <div className='absolute bottom-0 flex flex-col items-start gap-y-4 md:flex-row md:items-end w-full px-4 py-4 md:justify-between h-44 md:h-24 self-end'>
        <div className='flex ml-0 md:ml-32 flex-col justify-end z-10'>
          <h1 className='text-xl font-bold'>{user?.name}</h1>
          <p className='text-md'>Short description with a lot of details</p>
        </div>
        <div className='flex flex-row gap-x-6 justify-end z-10'>
          <span>
            <h1 className='md:text-xl font-bold'>Followers</h1>
            <p className='text-md'>10</p>
          </span>
          <span>
            <h1 className='md:text-xl font-bold'>Following</h1>
            <p className='text-md'>32</p>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
