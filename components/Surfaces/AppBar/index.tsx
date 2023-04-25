import dynamic from "next/dynamic";
import { MeetsTitle } from "../../Display/MeetsTitle";

const ProfileMenu = dynamic(() => import("./ProfileMenu"));

const AppBar = () => {
  return (
    <div className='flex items-center justify-between w-full h-20 px-4'>
      <div className='flex items-center space-x-4'>
        <MeetsTitle size='sm' />
      </div>
      <ProfileMenu />
    </div>
  );
};

export default AppBar;
