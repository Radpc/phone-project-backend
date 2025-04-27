import { PrismaClient } from '../../../generated/prisma';
import { deviceSeed } from './device.seed';

const prisma = new PrismaClient();

async function main() {
  try {
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
