"use client";

import { useCallback, useEffect, useState } from "react";
import { TextField } from "@/components/Inputs/TextField";
import { Loading, Search } from "@/public/icons";
import useDebounce from "@/hooks/useDebounce";
import { searchUsers } from "@/services/user.service";
import useSWRMutation from "swr/mutation";
import { match } from "ts-pattern";
import { Results } from "./Results";
import { useTranslation } from "@/app/i18n/client";

export const SearchBar = () => {
  const { t } = useTranslation("app-bar");
  const [searchString, setSearchString] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: results,
    trigger,
    isMutating,
  } = useSWRMutation("/users/search", searchUsers);
  const debouncedSearch = useDebounce(searchString, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOpen) {
      setIsOpen(true);
    }

    if (!e.target.value) {
      setIsOpen(false);
    }

    setSearchString(e.target.value);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleSearch = useCallback(async () => {
    await trigger(debouncedSearch);
  }, [debouncedSearch, trigger]);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch();
    }
  }, [debouncedSearch, handleSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleBlur();
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className='relative flex flex-col w-full px-4 text-sm'>
      <TextField
        autoComplete='off'
        placeholder={t("search")}
        icon={match(isMutating)
          .with(true, () => <Loading className='w-5 h-5 stroke-current' />)
          .otherwise(() => (
            <Search className='w-5 h-5' />
          ))}
        className='max-w-lg'
        name='search'
        onChange={handleChange}
      />
      <Results isOpen={isOpen} results={results} />
    </div>
  );
};

export default SearchBar;
