import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId, startDate, endDate, totalPrice } = await req.json();

  if (!listingId || !startDate || !endDate || !totalPrice)
    return NextResponse.error();

  const listingAndReservation = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
