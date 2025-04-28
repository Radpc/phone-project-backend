import { PrismaClient } from '../../../generated/prisma';
import { deviceCategorySeed } from './device-category.seed';
import { deviceSeed } from './device.seed';
import { userSeed } from './user.seed';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.createMany({ data: userSeed });
    await prisma.deviceCategory.createMany({ data: deviceCategorySeed });
    await prisma.device.createMany({ data: deviceSeed });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
