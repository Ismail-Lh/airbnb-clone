'use client';

import { SafeUser } from '@/app/types';

import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import CategoriesMenu from './CategoriesMenu';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed bg-white z-10 w-full shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center flex-row justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <CategoriesMenu />
    </div>
  );
}

export default Navbar;
