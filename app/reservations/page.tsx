import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import ReservationDetails from '../components/reservations/ReservationDetails';

export const dynamic = 'force-dynamic';

async function ReservationsPage() {
  const currentUser = await getCurrentUser();

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

  const reservations = await getReservations({ authorId: currentUser?.id });

  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found!"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationDetails
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
}

export default ReservationsPage;
