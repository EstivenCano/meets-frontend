"use client";

import { ProfileImage } from "../ProfileImage";
import Image from "next/image";
import { Profile } from "@/model/Profile";
import { FC, useEffect, useState } from "react";
import { userStore } from "@/stores/useUser.store";
import { match } from "ts-pattern";
import dynamic from "next/dynamic";
import { shimmerToBase64 } from "@/utils/shimmer";
import { useTranslation } from "@/app/i18n/client";
import Skeleton from "@/components/Feedback/Skeleton";
import useSWR from "swr";
import { getUser } from "@/services/user.service";

const EditProfile = dynamic(() => import("./EditProfile"));
const FollowForm = dynamic(() => import("../../Forms/FollowForm"));

interface ProfileCardProps {
  initialProfile?: Profile;
  id?: string;
}

const ProfileCard: FC<ProfileCardProps> = ({ initialProfile, id }) => {
  const { t } = useTranslation("profile");
  const user = userStore((state) => state.user);
  const [profile, setProfile] = useState(initialProfile);
  useSWR(!initialProfile ? `/users/${id}/profile` : null, getUser, {
    onSuccess(res) {
      setProfile(res);
    },
  });

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile, setProfile]);

  if (!profile) {
    return <Skeleton type='profile' />;
  }

  return (
    <section className='relative z-0 flex bg-violet-500/30 w-full h-96 md:h-64 max-w-6xl rounded-xl overflow-hidden'>
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
            <h1 className='md:text-xl font-bold'>{t("followers")}</h1>
            <p className='text-md'>{profile.followedBy}</p>
          </span>
          <span>
            <h1 className='md:text-xl font-bold'>{t("following")}</h1>
            <p className='text-md'>{profile.following}</p>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
