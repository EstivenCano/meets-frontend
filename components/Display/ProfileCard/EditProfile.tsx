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

  return (
    <>
      <IconButton
        icon={EditIcon}
        name='Edit profile'
        className='absolute top-4 right-4'
        onClick={() => setIsOpen(true)}
      />
      <Modal
        open={isOpen}
        title='Update profile'
        onClose={() => setIsOpen(false)}>
        <UpdateProfileForm profile={profile} />
      </Modal>
    </>
  );
};

export default EditProfile;
