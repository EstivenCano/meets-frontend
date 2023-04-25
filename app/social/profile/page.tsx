import dynamic from "next/dynamic";

const ProfileCard = dynamic(() => import("@/components/Display/ProfileCard"));

export default function Profile() {
  return <ProfileCard />;
}
