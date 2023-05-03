"use client";

import { ProfileImage } from "../ProfileImage";
import Image from "next/image";
import { Profile } from "@/services/model/Profile";
import { FC } from "react";
import { userStore } from "@/stores/useUser.store";
import { match } from "ts-pattern";
import dynamic from "next/dynamic";
import { shimmerToBase64 } from "@/utils/shimmer";

const EditProfile = dynamic(() => import("./EditProfile"));
const FollowForm = dynamic(() => import("../../Forms/FollowForm"));

interface ProfileCardProps {
  profile: Profile;
  id?: string;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile, id }) => {
  const user = userStore((state) => state.user);

  return (
    <section
      title='Profile'
      className='relative flex bg-violet-500/30 w-full h-96 md:h-64 max-w-6xl rounded-xl overflow-hidden'>
      <div className='absolute bg-gray-400/30 h-40 w-full rounded-xl'>
        <Image
          src={
            profile.cover ||
            "https://res.cloudinary.com/dwlgyffvu/image/upload/v1682524818/meets/MeetsCover7_wswckd.webp"
          }
          fill
          quality={100}
          placeholder='blur'
          blurDataURL={`data:image/svg+xml;base64,${shimmerToBase64(1000, 20)}`}
          className='rounded-xl'
          alt='Cover image'
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      {match(id === String(user?.id))
        .with(true, () => <EditProfile profile={profile} />)
        .otherwise(() => (
          <FollowForm id={id || ""} className='absolute top-4 right-4' />
        ))}
      <ProfileImage
        src={profile.picture || ""}
        size='lg'
        state='online'
        alt="User's profile image"
        className='mt-20 mx-4 min-w-max'
      />
      <div className='absolute bottom-0 flex flex-col items-start gap-y-4 md:flex-row md:items-end w-full px-4 py-4 md:justify-between h-44 md:h-24 self-end'>
        <div className='flex ml-0 md:ml-32 flex-col justify-end z-10'>
          <h1 className='text-xl font-bold'>{profile.name}</h1>
          <p className='text-md'>{profile.bio || "---"}</p>
        </div>
        <div className='flex flex-row gap-x-6 justify-end z-10'>
          <span>
            <h1 className='md:text-xl font-bold'>Followers</h1>
            <p className='text-md'>{profile.followedBy}</p>
          </span>
          <span>
            <h1 className='md:text-xl font-bold'>Following</h1>
            <p className='text-md'>{profile.following}</p>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
