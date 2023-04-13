'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite from '../hooks/useFavorite';
import { SafeUser } from '../types';

interface IProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

function HeartButton({ listingId, currentUser }: IProps) {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <button
      type="button"
      className="relative cursor-pointer transition hover:opacity-80"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute right-[-2px] top-[-2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </button>
  );
}

export default HeartButton;
