import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useLoginModalStore from '@/app/stores/useLoginModalStore';
import { SafeUser } from '../types';

interface IProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IProps) => {
  const router = useRouter();
  const loginModal = useLoginModalStore();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    // eslint-disable-next-line consistent-return
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let res;

        if (hasFavorited) {
          res = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          res = () => axios.post(`/api/favorites/${listingId}`);
        }

        await res();
        toast.success('Success!');

        router.refresh();
      } catch (error) {
        toast.error('Something went wrong!');
      }
    },
    [currentUser, loginModal, hasFavorited, listingId, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
