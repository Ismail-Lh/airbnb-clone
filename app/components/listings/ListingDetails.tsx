'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';

import useLoginModalStore from '@/app/stores/useLoginModalStore';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { categories } from '@/app/utils/constants';
import Container from '../Container';
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';
import ListingReservation from './ListingReservation';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface IProps {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}

function hello() {}

function ListingDetails({ listing, currentUser, reservations }: IProps) {
  const loginModal = useLoginModalStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates: Date[] = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(
    () => categories.find(({ label }) => label === listing.category),
    [listing.category]
  );

  // eslint-disable-next-line consistent-return
  const onCreateReservation = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    try {
      const { data } = await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      });

      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      router.push('/trips');
      setIsLoading(false);

      return data;
    } catch (error) {
      toast.error('Something went wrong!');
      setIsLoading(false);
    }
  }, [currentUser, loginModal, dateRange, router, totalPrice, listing.id]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imgSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              category={category}
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingDetails;
