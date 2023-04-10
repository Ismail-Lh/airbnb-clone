import { User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type CountrySelectValues = {
  value: string;
  label: string;
  flag: string;
  region: string;
  latlng: number[];
};
