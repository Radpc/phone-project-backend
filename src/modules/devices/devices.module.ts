import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesRepoService } from './repos/devices-repo.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    DevicesRepoService,
    {
      provide: 'IDevicesRepo',
      useExisting: DevicesRepoService,
    },
  ],
})
export class DevicesModule {}
