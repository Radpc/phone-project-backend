import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  DevicesRepoInterface,
  IListDeviceParams,
} from './repos/devices-repo-interface';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('IDevicesRepo')
    private readonly deviceCategoryRepo: DevicesRepoInterface,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const repoRes = await this.deviceCategoryRepo.create(createDeviceDto);
    return repoRes;
  }

  async findAll(params: IListDeviceParams) {
    const repoRes = await this.deviceCategoryRepo.list(params);
    return repoRes;
  }

  async findOne(deviceId: number) {
    const repoRes = await this.deviceCategoryRepo.get(deviceId);
    return repoRes;
  }

  async update(deviceId: number, updateDeviceDto: UpdateDeviceDto) {
    const repoRes = await this.deviceCategoryRepo.update(
      deviceId,
      updateDeviceDto,
    );
    return repoRes;
  }

  async remove(deviceId: number) {
    const repoRes = await this.deviceCategoryRepo.delete(deviceId);
    return repoRes;
  }
}
