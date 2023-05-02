import dynamic from "next/dynamic";
import Title from "./Title";

const ProfileMenu = dynamic(() => import("./ProfileMenu"));
const SearchBar = dynamic(() => import("./SearchBar"));

const AppBar = () => {
  return (
    <div className='flex items-center justify-between w-full h-20 px-4 z-10 border-b-[1px] border-b-gray-400/20'>
      <Title />
      <SearchBar />
      <ProfileMenu />
    </div>
  );
};

export default AppBar;
