import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DevicesModule } from './modules/devices/devices.module';
import { DeviceCategoriesModule } from './modules/device-categories/device-categories.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, DevicesModule, DeviceCategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
