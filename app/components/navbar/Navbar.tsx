'use client';

import { SafeUser } from '@/app/types';
import Container from '../Container';
import CategoriesMenu from './CategoriesMenu';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
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
