/* eslint-disable consistent-return */

'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';

import useLoginModalStore from '@/app/stores/useLoginModalStore';
import useRegisterModalStore from '@/app/stores/useRegisterModalStore';
import useRentModalStore from '@/app/stores/useRentModalStore';
import { SafeUser } from '@/app/types';
import Avatar from '../Avatar';
import MenuItems from './MenuItems';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
  const router = useRouter();

  const registerModal = useRegisterModalStore();
  const loginModal = useLoginModalStore();
  const rentModal = useRentModalStore();

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
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </button>
        <button
          type="button"
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md  md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar imgSrc={currentUser?.image} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-sm md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItems
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItems
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItems
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
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
