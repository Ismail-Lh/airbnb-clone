'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { SafeListing, SafeUser } from '@/app/types';
import Container from '../Container';
import Heading from '../Heading';
import ListingCard from '../listings/ListingCard';

interface IProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}

function PropertiesDetails({ currentUser, listings }: IProps) {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/listings/${id}`);

        toast.success('Listing Deleted!');
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
      <Heading title="Properties" subTitle="List of your properties!" />

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            actionLabel="Delete Property"
            onAction={onCancel}
            disabled={deletingId === listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesDetails;
