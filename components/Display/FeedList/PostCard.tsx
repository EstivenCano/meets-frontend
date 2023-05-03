"use client";

import { Feed } from "@/services/model/Feed";
import { ProfileImage } from "../ProfileImage";
import { IconButton } from "@/components/Inputs/IconButton";
import { FC } from "react";
import { match } from "ts-pattern";
import { Comment, Delete } from "@/public/icons";
import { dateToLongString } from "@/utils/dateToLongString";
import dynamic from "next/dynamic";

const LikeForm = dynamic(() => import("../../Forms/LikeForm"));

interface PostCardProps {
  post: Feed;
  userId?: string;
}

export const PostCard: FC<PostCardProps> = ({ post, userId }) => {
  return (
    <div className='max-h-72 flex flex-col items-start justify-center w-full bg-background p-4 max-w-6xl rounded-xl shadow-sm shadow-gray-400 dark:shadow-gray-600 gap-y-2'>
      <span className='flex items-center gap-x-2 w-full'>
        <ProfileImage
          size='xxs'
          src={post.author.profile.picture}
          alt={post.author.name}
          className='w-8 h-8 rounded-full'
        />
        <span className='block'>
          <p className='text-sm'>{post.author.name}</p>
          <p className='text-xs text-gray-500'>
            {dateToLongString(new Date(post.createdAt))}
          </p>
        </span>
        {match(post.authorId === Number(userId))
          .with(true, () => (
            <IconButton
              icon={<Delete className='p-1' />}
              size='xs'
              name='Delete'
              className='ml-auto self-start hover:bg-red-600 hover:text-white'
              onClick={() => {}}
            />
          ))
          .otherwise(() => null)}
      </span>
      <span className='mt-4'>
        <h2 className='text-md font-bold'>{post.title}</h2>
      </span>
      <p className='text-sm py-2'>{post.content}</p>
      <hr className='border-violet-500 w-full' />
      <div className='flex items-center gap-x-4 justify-end md:justify-between w-full'>
        <span className='flex items-center gap-x-2'>
          <LikeForm
            id={post.id}
            liked={post.likedBy.some((user) => user.id === Number(userId))}
          />
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            {post._count.likedBy} Likes
          </span>
        </span>
        <button className='flex items-center gap-x-2'>
          <Comment
            commented={post.comments.some(
              (comment) => comment.author.id === Number(userId)
            )}
          />
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            {post._count.comments} Comments
          </span>
        </button>
      </div>
    </div>
  );
};
