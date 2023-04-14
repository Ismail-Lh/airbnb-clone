'use client';

import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ICategory {
  label: string;
  description: string;
  icon: IconType;
}

interface IProps {
  user: SafeUser;
  category: ICategory | undefined;
  description: string;
  locationValue: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
}

function ListingInfo({
  user,
  category,
  description,
  locationValue,
  roomCount,
  guestCount,
  bathroomCount,
}: IProps) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-2 
            text-xl
            font-semibold
          "
        >
          <p>Hosted by {user?.name}</p>
          <Avatar imgSrc={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <p
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}

export default ListingInfo;
