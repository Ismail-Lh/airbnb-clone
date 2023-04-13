'use client';

import { SafeUser } from '@/app/types';

interface IProps {
  id: string;
  title: string;
  imgSrc: string;
  currentUser?: SafeUser | null;
}

function ListingHead({ id, title, imgSrc, currentUser }: IProps) {
  return <div>ListingHead</div>;
}

export default ListingHead;
