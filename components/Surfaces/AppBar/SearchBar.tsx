import { TextField } from "@/components/Inputs/TextField";
import SearchIcon from "@/public/search.svg";
import Image from "next/image";

export const SearchBar = () => {
  return (
    <div className='flex w-full px-4 text-sm'>
      <TextField
        placeholder='Search...'
        icon={
          <Image
            src={SearchIcon}
            alt='Search icon'
            width={20}
            height={20}
            className='dark:invert'
          />
        }
        className='bg-gray-300/10 border-violet-500/40 text-text max-w-lg'
        name='search'
      />
    </div>
  );
};

export default SearchBar;
