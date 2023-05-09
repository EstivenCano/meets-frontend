import Skeleton from "@/components/Feedback/Skeleton";
import { getFirstFeed } from "@/services/post.service";
import dynamic from "next/dynamic";

const NewPostForm = dynamic(() => import("@/components/Forms/NewPostForm"));
const FeedList = dynamic(() => import("@/components/Display/FeedList"), {
  loading: () => (
    <div className='flex flex-col gap-y-4 w-full'>
      <Skeleton type='post' />
      <Skeleton type='post' />
    </div>
  ),
});

export default async function Feed() {
  const post = await getFirstFeed();

  return (
    <>
      <h1 className='self-start text-sm font-bold mb-2 sr-only'>
        This is your Feed
      </h1>
      <NewPostForm />
      <hr className='border-violet-400 w-full my-4' />
      <FeedList initialFeed={post.data} />
    </>
  );
}