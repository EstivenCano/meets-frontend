"use client";

import { ProfileImage } from "@/components/Display/ProfileImage";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoutItem } from "./LogoutItem";
import { ProfileItem } from "./ProfileItem";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { userStore } from "@/stores/useUser.store";
import { SettingsItem } from "./SettingsItem";
import { useTranslation } from "@/app/i18n/client";

const ProfileMenu = () => {
  const ref = useRef(null);
  const user = userStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => setIsOpen(true);

  const handleCloseMenu = () => setIsOpen(false);

  useOnClickOutside(ref, handleCloseMenu);
  useTranslation("app-bar");

  return (
    <nav ref={ref} className='relative z-10'>
      <button className='flex items-center space-x-4' onClick={handleOpenMenu}>
        <ProfileImage
          src={user?.picture || ""}
          size='xxs'
          state='online'
          alt="User's profile image"
          className='select-none'
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='absolute right-0 w-48 py-2 mt-2 bg-background rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-600 top-16 select-none'>
            <ProfileItem id={user?.id} />
            <SettingsItem />
            <LogoutItem />
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ProfileMenu;
