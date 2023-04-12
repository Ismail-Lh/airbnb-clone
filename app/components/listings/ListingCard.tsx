'use client';

import { Listing } from '@prisma/client';

interface IProps {
  data: Listing;
}

function ListingCard({ data }: IProps) {
  return <div>ListingCard</div>;
}

export default ListingCard;
