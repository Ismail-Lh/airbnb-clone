import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import TripsDetails from '../components/trips/TripsDetails';

export const dynamic = 'force-dynamic';

async function TripsPage() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized!"
          subtitle="Please login to your account!"
        />
      </ClientOnly>
    );
  }

  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found!"
          subtitle="Looks like you haven't reserved any trips. "
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsDetails currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
}

export default TripsPage;
