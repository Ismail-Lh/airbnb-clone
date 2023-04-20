'use client';

import { SafeListing, SafeUser } from '@/app/types';
import Container from '../Container';
import Heading from '../Heading';
import ListingCard from '../listings/ListingCard';

interface IProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}

function FavoriteDetails({ currentUser, listings }: IProps) {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places your favorites!" />
      <div
        className="
        mt-10
        grid 
        grid-cols-1 
        gap-8 
        sm:grid-cols-2 
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}

export default FavoriteDetails;
