'use client';

import { Listing } from '@prisma/client';

interface IProps {
  data: Listing;
}

function ListingCard({ data }) {
  return <div>ListingCard</div>;
}

export default ListingCard;
