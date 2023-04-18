'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { SafeReservation, SafeUser } from '@/app/types';
import Container from '../Container';
import Heading from '../Heading';
import ListingCard from '../listings/ListingCard';

interface IProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}

function TripsDetails({ currentUser, reservations }: IProps) {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/reservations/${id}`);

        toast.success('Reservation Canceled!');
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      }

      setDeletingId('');
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going."
      />

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            actionLabel="Cancel Reservation"
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default TripsDetails;
