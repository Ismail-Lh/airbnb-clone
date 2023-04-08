/* eslint-disable consistent-return */

'use client';

import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';

import { SafeUser } from '@/app/types';
import useRegisterModalStore from '@/app/stores/useRegisterModalStore';
import useRentModalStore from '@/app/stores/useRentModalStore';
import useLoginModalStore from '@/app/stores/useLoginModalStore';

import MenuItems from './MenuItems';
import Avatar from '../Avatar';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
  const registerModal = useRegisterModalStore((state) => state);
  const loginModal = useLoginModalStore((state) => state);
  const rentModal = useRentModalStore((state) => state);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen((value) => !value);

  const openRentModal = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          type="button"
          onClick={openRentModal}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </button>
        <button
          type="button"
          onClick={toggleOpen}
          className="flex flex-row items-center gap-3 border-[1px] border-neutral-200 p-4 md:py-1 md:px-2 rounded-full hover:shadow-md  transition cursor-pointer"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar imgSrc={currentUser?.image} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 bg-white w-[40vw] md:w-3/4 overflow-hidden text-sm rounded-xl shadow-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItems label="My trips" onClick={() => {}} />
                <MenuItems label="My favorites" onClick={() => {}} />
                <MenuItems label="My reservations" onClick={() => {}} />
                <MenuItems label="My properties" onClick={() => {}} />
                <MenuItems label="Airbnb my home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItems label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItems label="Login" onClick={loginModal.onOpen} />
                <MenuItems label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
