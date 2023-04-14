import React from 'react';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ListingDetails from '@/app/components/listings/ListingDetails';

interface IParams {
  id: string;
}

async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingDetails listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
}

export default ListingPage;
