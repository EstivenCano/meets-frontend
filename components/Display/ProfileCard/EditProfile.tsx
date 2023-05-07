"use client";

import { FC, useState } from "react";

import { Modal } from "@/components/Surfaces/Modal";

import { Profile } from "@/model/Profile";
import { IconButton } from "@/components/Inputs/IconButton";
import UpdateProfileForm from "@/components/Forms/UpdateProfile";
import { Edit } from "@/public/icons";

interface EditProfileProps {
  profile: Profile;
}

const EditProfile: FC<EditProfileProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='absolute top-4 right-4'>
      <IconButton
        size='sm'
        icon={<Edit className='w-5 h-5' />}
        name='Edit profile'
        onClick={handleOpen}
      />
      <Modal open={isOpen} title='Update profile' onClose={handleClose}>
        <UpdateProfileForm profile={profile} closeForm={handleClose} />
      </Modal>
    </div>
  );
};

export default EditProfile;
