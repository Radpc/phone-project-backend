import { Module } from '@nestjs/common';
import { DeviceCategoriesService } from './device-categories.service';
import { DeviceCategoriesController } from './device-categories.controller';
import { DeviceCategoriesRepoService } from './repos/device-categories-repo.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeviceCategoriesController],
  providers: [
    DeviceCategoriesService,
    DeviceCategoriesRepoService,
    {
      provide: 'IDeviceCategoriesRepo',
      useExisting: DeviceCategoriesRepoService,
    },
  ],
})
export class DeviceCategoriesModule {}
