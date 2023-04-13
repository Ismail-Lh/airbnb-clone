'use client';

import { useMemo } from 'react';
import { Reservation } from '@prisma/client';

import { SafeListing, SafeUser } from '@/app/types';
import { categories } from '@/app/utils/constants';
import Container from '../Container';
import ListingHead from './ListingHead';

interface IProps {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  reservation?: Reservation[];
}

function ListingDetails({ listing, currentUser, reservation }: IProps) {
  const category = useMemo(
    () => categories.find(({ label }) => label === listing.category),
    [listing.category]
  );

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imgSrc={listing.imageSrc}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  );
}

export default ListingDetails;
