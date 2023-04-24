import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import getReservations from '@/app/actions/getReservations';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ListingDetails from '@/app/components/listings/ListingDetails';

interface IParams {
  id: string;
}

export const dynamic = 'force-dynamic';

async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
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
      <ListingDetails
        // @ts-ignore
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
}

export default ListingPage;
