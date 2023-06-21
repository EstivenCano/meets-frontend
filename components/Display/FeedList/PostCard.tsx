"use client";

import { Feed } from "@/model/Feed";
import { ProfileImage } from "../ProfileImage";
import { FC } from "react";
import { match } from "ts-pattern";
import { Comment as CommentIcon } from "@/public/icons";
import { dateToLongString } from "@/utils/dateToLongString";
import dynamic from "next/dynamic";
import { useRouterLocale } from "@/hooks/useRouter";
import { useParams } from "next/navigation";

const LikeForm = dynamic(() => import("../../Forms/LikeForm"));
const DeleteForm = dynamic(() => import("../../Forms/DeletePostForm"));
const Likes = dynamic(() => import("../Likes"));
const Comments = dynamic(() => import("../Comments"));

interface PostCardProps {
  post: Feed;
  userId?: string;
}

export const PostCard: FC<PostCardProps> = ({ post, userId }) => {
  const { lng } = useParams();
  const router = useRouterLocale();

  const handleProfileClick = () => {
    router.push(`/social/profile/${post.authorId}`);
  };

  return (
    <div className='flex flex-col items-start justify-center w-full bg-background p-4 max-w-6xl rounded-xl shadow-sm shadow-gray-400 dark:shadow-gray-600 gap-y-2'>
      <span className='relative flex items-center gap-x-2 w-full'>
        <ProfileImage
          size='xxs'
          src={post.author.profile.picture}
          alt={post.author.name}
          className='w-8 h-8 rounded-full cursor-pointer'
          onClick={handleProfileClick}
        />
        <span className='block'>
          <p className='text-sm'>{post.author.name}</p>
          <p className='text-xs text-gray-500'>
            {dateToLongString(new Date(post.createdAt), lng)}
          </p>
        </span>
        {match(post.authorId === Number(userId))
          .with(true, () => <DeleteForm id={post.id} />)
          .otherwise(() => null)}
      </span>
      <span className='mt-4'>
        <h2 className='text-md font-bold'>{post.title}</h2>
      </span>
      <p className='text-sm py-2 break-all'>{post.content}</p>
      <hr className='border-violet-500 w-full' />
      <div className='flex items-center gap-x-4 justify-end w-full'>
        <span className='flex items-center gap-x-2'>
          <LikeForm
            id={post.id}
            liked={post.likedBy.some((user) => user.id === Number(userId))}
          />
          <Likes id={post.id} count={post._count.likedBy} />
        </span>
        <span className='flex items-center gap-x-2'>
          <CommentIcon />
          <Comments id={post.id} count={post._count.comments} />
        </span>
      </div>
    </div>
  );
};
