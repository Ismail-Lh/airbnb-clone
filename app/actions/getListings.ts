import prisma from '@/app/libs/prismadb';
import { SafeListing } from '../types';

export interface IListingParams {
  userId?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const { userId } = params;

    const query: any = {};

    if (userId) query.userId = userId;

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
    });

    const safeListings: SafeListing[] = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
