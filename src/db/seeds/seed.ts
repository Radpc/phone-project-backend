import { PrismaClient } from '../../../generated/prisma';
import { deviceCategorySeed } from './device-category.seed';
import { deviceSeed } from './device.seed';
import { userSeed } from './user.seed';

const prisma = new PrismaClient();

async function main() {
  try {
    await Promise.allSettled(
      userSeed.map((u) =>
        prisma.user.upsert({
          where: { id: u.id },
          create: u,
          update: {},
        }),
      ),
    );

    await Promise.allSettled(
      deviceCategorySeed.map((u) =>
        prisma.deviceCategory.upsert({
          where: { id: u.id },
          create: u,
          update: {},
        }),
      ),
    );

    await Promise.allSettled(
      deviceSeed.map((u) =>
        prisma.device.upsert({
          where: { id: u.id },
          create: u,
          update: {},
        }),
      ),
    );
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
