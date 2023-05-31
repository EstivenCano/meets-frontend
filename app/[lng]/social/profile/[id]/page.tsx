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
  const access = cookies().get("access_token")?.value;

  const { id } = params;

  const postData = await getFirstFeed(access, Number(id));
  const profileData = await getUserProfileFromServer(id, access);

  const [posts, profile] = await Promise.all([postData, profileData]);

  return (
    <>
      <ProfileCard initialProfile={profile} id={id} />
      <NewPostForm />
      <FeedList initialFeed={posts?.data} byAuthor={Number(id)} />
    </>
  );
}
