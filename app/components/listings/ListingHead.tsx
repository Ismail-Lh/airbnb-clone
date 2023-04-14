'use client';

import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface IProps {
  id: string;
  title: string;
  imgSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

function ListingHead({
  id,
  title,
  imgSrc,
  locationValue,
  currentUser,
}: IProps) {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          relative
          h-[60vh]
          w-full 
          overflow-hidden
          rounded-xl
        "
      >
        <Image src={imgSrc} fill className="w-full object-cover" alt={title} />
        <div
          className="
            absolute
            right-5
            top-5
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}

export default ListingHead;
