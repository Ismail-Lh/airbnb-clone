/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import Button from '../Button';
import HeartButton from '../HeartButton';

interface IProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation | null;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
  onAction?: (id: string) => void;
}

function ListingCard({
  data,
  currentUser,
  reservation,
  actionLabel,
  actionId = '',
  disabled,
  onAction,
}: IProps) {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) return;

    onAction?.(actionId);
  };

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`;
  }, [reservation]);

  return (
    <div
      className="group col-span-1 cursor-pointer"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            alt={data.title}
            src={data.imageSrc}
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <p className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </p>
        <p className="font-light text-neutral-500">
          {reservationDate || data.category}
        </p>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">per night</div>}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;
