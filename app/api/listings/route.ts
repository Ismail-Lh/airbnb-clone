import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const {
    category,
    imageSrc,
    description,
    title,
    guestCount,
    roomCount,
    bathroomCount,
    price,
    location,
  } = await req.json();

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
