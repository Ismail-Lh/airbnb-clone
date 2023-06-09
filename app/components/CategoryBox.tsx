'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { IconType } from 'react-icons';

interface IProps {
  label: string;
  icon: IconType;
  selected?: boolean | null;
}

function CategoryBox({ label, icon: Icon, selected }: IProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = { ...currentQuery, category: label };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${
        selected ? 'border-b-neutral-800' : 'border-transparent'
      } ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
    >
      <Icon size={26} />
      <p className="text-sm font-medium">{label}</p>
    </button>
  );
}

export default CategoryBox;
