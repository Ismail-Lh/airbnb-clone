/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { IconType } from 'react-icons';

interface IProps {
  label: string;
  icon: IconType;
  selected?: boolean | null;
  onClick: (value: string) => void;
}

function CategoryInput({ label, icon: Icon, selected, onClick }: IProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col gap-3 p-4 rounded-xl border-2 hover:border-black transition cursor-pointer ${
        selected ? 'border-black' : 'border-neutral-200'
      }`}
    >
      <Icon size={30} />
      <p className="font-semibold">{label}</p>
    </div>
  );
}

export default CategoryInput;
