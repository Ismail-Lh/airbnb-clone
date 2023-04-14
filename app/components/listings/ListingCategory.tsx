'use client';

import { IconType } from 'react-icons';

interface IProps {
  label: string;
  description: string;
  icon: IconType;
}

function ListingCategory({ icon: Icon, label, description }: IProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{label}</h2>
          <p className="font-light text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ListingCategory;
