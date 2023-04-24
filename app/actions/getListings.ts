import prisma from '@/app/libs/prismadb';
import { SafeListing } from '../types';

export interface IListingParams {
  userId?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      category,
      startDate,
      endDate,
      locationValue,
      guestCount,
      roomCount,
      bathroomCount,
    } = params;

    const query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (locationValue) query.locationValue = locationValue;

    if (guestCount) query.guestCount = { gte: +guestCount };
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

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
