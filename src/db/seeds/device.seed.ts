import { Prisma } from '../../../generated/prisma';

export const deviceSeed: Prisma.DeviceCreateManyInput[] = [
  { color: 'red', deviceCategoryId: 1, partNumber: 501 },
  { color: 'green', deviceCategoryId: 1, partNumber: 502 },
  { color: 'blue', deviceCategoryId: 1, partNumber: 503 },
];
