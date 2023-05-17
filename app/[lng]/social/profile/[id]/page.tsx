import Skeleton from "@/components/Feedback/Skeleton";
import { getFirstFeed } from "@/services/post.service";
import { getUserProfileFromServer } from "@/services/user.service";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const ProfileCard = dynamic(() => import("@/components/Display/ProfileCard"), {
  loading: () => <Skeleton type='profile' />,
});

const NewPostForm = dynamic(() => import("@/components/Forms/NewPostForm"));
const FeedList = dynamic(() => import("@/components/Display/FeedList"), {
  loading: () => (
    <div className='flex flex-col gap-y-4 w-full'>
      <Skeleton type='post' />
      <Skeleton type='post' />
    </div>
  ),
});

export default async function Profile({ params }: { params: { id: string } }) {
  const token = cookies().get("access_token");

  const { id } = params;

  const profile = await getUserProfileFromServer(id, token?.value);
  const post = await getFirstFeed(token?.value, Number(id));

  return (
    <>
      <ProfileCard profile={profile} id={id} />
      <NewPostForm />
      <FeedList initialFeed={post.data} byAuthor={Number(id)} />
    </>
  );
}
