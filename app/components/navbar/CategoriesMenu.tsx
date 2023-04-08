'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { categories } from '@/app/utils/constants';
import Container from '../Container';
import CategoryBox from '../CategoryBox';

function CategoriesMenu() {
  const params = useSearchParams();
  const pathname = usePathname();

  const category = params?.get('category');
  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
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
