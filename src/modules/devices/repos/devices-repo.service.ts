import { Injectable } from '@nestjs/common';
import {
  DevicesRepoInterface,
  ICreateDevice,
  IListDeviceParams,
  IUpdateDevice,
} from './devices-repo-interface';
import { Device } from '../entities/device.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ServiceError, ServiceErrorType } from 'src/utils/service-error';
import { Prisma } from 'generated/prisma';

@Injectable()
export class DevicesRepoService implements DevicesRepoInterface {
  constructor(private prisma: PrismaService) {}

  async create(payload: ICreateDevice): Promise<{ data: Device }> {
    const res = await this.prisma.device.create({
      data: {
        partNumber: payload.partNumber,
        color: payload.color,
        deviceCategoryId: payload.categoryId,
      },
      include: { category: true },
    });

    return { data: Device.fromRaw(res) };
  }
  async get(deviceId: number): Promise<{ data: Device }> {
    const res = await this.prisma.device.findUnique({
      where: { id: deviceId },
      include: { category: true },
    });

    if (!res) {
      throw new ServiceError('Device  not found', ServiceErrorType.NotFound);
    }
    return { data: Device.fromRaw(res) };
  }

  async list(
    params: IListDeviceParams,
  ): Promise<{ data: Device[]; total: number }> {
    const { page, pageSize, searchBy } = params;
    const take = pageSize;
    const skip = (page - 1) * take;

    const whereAND: Prisma.DeviceWhereInput['AND'] = [];

    // if (searchBy) {
    //   whereAND.push({ partNumber: { contains: searchBy } });
    // }

    const where = whereAND ? { AND: whereAND } : undefined;

    const count = this.prisma.device.count({ where });
    const query = this.prisma.device.findMany({
      skip,
      take,
      where,
    });

    const [countRes, rawRes] = await Promise.all([count, query]);

    return {
      data: rawRes.map((r) => Device.fromRaw(r)),
      total: countRes,
    };
  }

  async update(
    deviceId: number,
    payload: IUpdateDevice,
  ): Promise<{ data: Device }> {
    const updateData: Prisma.DeviceUpdateInput = {
      partNumber: payload.partNumber,
      category: payload.categoryId
        ? { connect: { id: payload.categoryId } }
        : undefined,
      color: payload.color,
    };

    const res = await this.prisma.device.update({
      data: updateData,
      where: { id: deviceId },
    });

    return { data: Device.fromRaw(res) };
  }

  async delete(deviceId: number): Promise<{ data: Device }> {
    const res = await this.prisma.device.delete({
      where: { id: deviceId },
    });

    return { data: Device.fromRaw(res) };
  }
}
