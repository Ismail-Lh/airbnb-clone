import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

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

export async function GET(request: Request) {
  return request;
}
