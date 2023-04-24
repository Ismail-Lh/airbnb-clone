'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { categories } from '@/app/utils/constants';
import CategoryBox from '../CategoryBox';
import Container from '../Container';

function CategoriesMenu() {
  const params = useSearchParams();
  const pathname = usePathname();

  const category = params?.get('category');
  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map(({ label, icon }) => (
          <CategoryBox
            key={label}
            label={label}
            icon={icon}
            selected={category === label}
          />
        ))}
      </div>
    </Container>
  );
}

export default CategoriesMenu;
