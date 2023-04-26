import { getUserProfileFromServer } from "@/services/user.service";
import dynamic from "next/dynamic";

const ProfileCard = dynamic(() => import("@/components/Display/ProfileCard"));

export default async function Profile({ params }: { params: { id: string } }) {
  const { id } = params;

  const profile = await getUserProfileFromServer(id);

  return (
    <>
      {profile && <h1>{profile.name}</h1>}

      <ProfileCard />
    </>
  );
}
