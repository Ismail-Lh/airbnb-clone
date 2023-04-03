'use client';

type MenuItemsProps = {
  onClick: () => void;
  label: string;
};

function MenuItems({ onClick, label }: MenuItemsProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className="px-4 py-3 hover:bg-neutral-100 font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default MenuItems;
