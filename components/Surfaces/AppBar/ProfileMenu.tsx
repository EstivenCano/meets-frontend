"use client";

import { ProfileImage } from "@/components/Display/ProfileImage";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import SettingsIcon from "@/public/settings.svg";
import { LogoutItem } from "./LogoutItem";
import { ProfileItem } from "./ProfileItem";
import useOnClickOutside from "@/hooks/useOnClickOutside";

//Place menu content relative to the button
const ProfileMenu = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => setIsOpen(true);

  const handleCloseMenu = () => setIsOpen(false);

  useOnClickOutside(ref, handleCloseMenu);

  return (
    <nav ref={ref} className='relative'>
      <button className='flex items-center space-x-4' onClick={handleOpenMenu}>
        <ProfileImage
          src='https://i.pravatar.cc/1000?img=38'
          size='xxs'
          state='online'
          alt="User's profile image"
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='absolute right-0 w-48 py-2 mt-2 bg-background rounded-md shadow-sm shadow-foreground top-16 select-none'>
            <ProfileItem />
            <li className='flex gap-x-2 px-4 py-2 text-sm hover:bg-violet-500 cursor-pointer hover:text-white'>
              <Image
                src={SettingsIcon}
                alt='Settings icon'
                width={20}
                height={20}
                className='dark:invert'
              />
              Settings
            </li>
            <LogoutItem />
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ProfileMenu;
