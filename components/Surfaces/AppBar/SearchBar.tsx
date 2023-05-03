import { TextField } from "@/components/Inputs/TextField";
import { Search } from "@/public/icons";

export const SearchBar = () => {
  return (
    <div className='flex w-full px-4 text-sm'>
      <TextField
        placeholder='Search...'
        icon={<Search className='w-4 h-4' />}
        className='max-w-lg'
        name='search'
      />
    </div>
  );
};

export default SearchBar;
