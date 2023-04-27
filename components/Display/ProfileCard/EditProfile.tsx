"use client";

import { FC, useState } from "react";

import { Modal } from "@/components/Surfaces/Modal";

import { Profile } from "@/services/model/Profile";
import EditIcon from "@/public/edit.svg";
import { IconButton } from "@/components/Inputs/IconButton";
import UpdateProfileForm from "@/components/Forms/UpdateProfile";

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
        icon={EditIcon}
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
