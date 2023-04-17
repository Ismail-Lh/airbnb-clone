'use client';

import { Range } from 'react-date-range';

import Button from '../Button';
import Calendar from '../inputs/Calendar';

interface IProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

function ListingReservation({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: IProps) {
  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="text-2xl font-semibold">$ {price}</p>
        <p className="font-light text-neutral-600">per night</p>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />

      <hr />

      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
    </div>
  );
}

export default ListingReservation;
