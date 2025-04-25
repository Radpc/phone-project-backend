import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DevicesModule } from './devices/devices.module';
import { DeviceCategoriesModule } from './device-categories/device-categories.module';

@Module({
  imports: [UsersModule, DevicesModule, DeviceCategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
