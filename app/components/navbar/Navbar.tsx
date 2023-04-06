'use client';

import { User } from '@prisma/client';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

interface NavbarProps {
  currentUser?: User | null;
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
    </div>
  );
}

export default Navbar;
