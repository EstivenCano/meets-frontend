import Skeleton from "@/components/Feedback/Skeleton";
import { getUserProfileFromServer } from "@/services/user.service";
import dynamic from "next/dynamic";

const ProfileCard = dynamic(() => import("@/components/Display/ProfileCard"), {
  loading: () => <Skeleton type='profile' />,
});

const NewPostForm = dynamic(() => import("@/components/Forms/NewPostForm"));

export default async function Profile({ params }: { params: { id: string } }) {
  const { id } = params;

  const profile = await getUserProfileFromServer(id);

  return (
    <>
      <ProfileCard profile={profile} id={id} />
    </>
  );
}
