/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string')
    throw new Error('Invalid ID!');

  const favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string')
    throw new Error('Invalid ID!');

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(updatedUser);
}