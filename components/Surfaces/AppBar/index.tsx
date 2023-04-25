import dynamic from "next/dynamic";
import Title from "./Title";

const ProfileMenu = dynamic(() => import("./ProfileMenu"));

const AppBar = () => {
  return (
    <div className='flex items-center justify-between w-full h-20 px-4'>
      <Title />
      <ProfileMenu />
    </div>
  );
};

export default AppBar;
