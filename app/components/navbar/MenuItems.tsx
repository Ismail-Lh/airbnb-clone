'use client';

type MenuItemsProps = {
  onClick: () => void;
  label: string;
};

function MenuItems({ onClick, label }: MenuItemsProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <button
      type="button"
      className="px-4 py-3 text-start font-semibold hover:bg-neutral-100"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default MenuItems;
