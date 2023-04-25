import dynamic from "next/dynamic";

const Logout = dynamic(() => import("@/components/Inputs/Logout"));

//It will display all the posts from the users that the current user is following
export default function Feed() {
  return (
    <div>
      <h1>Feed</h1>
      <Logout />
    </div>
  );
}
