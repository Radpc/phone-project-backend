import { Injectable } from '@nestjs/common';
import {
  DeviceCategoriesRepoInterface,
  ICreateDeviceCategory,
  IListDeviceCategoryParams,
  IUpdateDeviceCategory,
} from './device-categories-repo-interface';
import { DeviceCategory } from '../entities/device-category.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma';

@Injectable()
export class DeviceCategoriesRepoService
  implements DeviceCategoriesRepoInterface
{
  constructor(private prisma: PrismaService) {}

  async create(
    payload: ICreateDeviceCategory,
  ): Promise<{ data: DeviceCategory }> {
    const res = await this.prisma.deviceCategory.create({
      data: { name: payload.name },
    });

    return { data: DeviceCategory.fromRaw(res) };
  }

  async get(deviceCategoryId: number): Promise<{ data: DeviceCategory }> {
    const res = await this.prisma.deviceCategory.findUniqueOrThrow({
      where: { id: deviceCategoryId },
    });

    return { data: DeviceCategory.fromRaw(res) };
  }

  async list(
    params: IListDeviceCategoryParams,
  ): Promise<{ data: DeviceCategory[]; total: number }> {
    const { page, pageSize, searchBy } = params;
    const take = pageSize;
    const skip = (page - 1) * take;

    const whereAND: Prisma.DeviceCategoryWhereInput['AND'] = [];

    if (searchBy) {
      whereAND.push({ name: { contains: searchBy } });
    }

    const where = whereAND ? { AND: whereAND } : undefined;

    const count = this.prisma.deviceCategory.count({ where });
    const query = this.prisma.deviceCategory.findMany({
      skip,
      take,
      where,
    });

    const [countRes, rawRes] = await Promise.all([count, query]);

    return {
      data: rawRes.map((r) => DeviceCategory.fromRaw(r)),
      total: countRes,
    };
  }

  async update(
    deviceCategoryId: number,
    payload: IUpdateDeviceCategory,
  ): Promise<{ data: DeviceCategory }> {
    const updateData: Prisma.DeviceCategoryUpdateInput = {
      name: payload.name,
    };

    const res = await this.prisma.deviceCategory.update({
      data: updateData,
      where: { id: deviceCategoryId },
    });

    return { data: DeviceCategory.fromRaw(res) };
  }

  async delete(deviceCategoryId: number): Promise<{ data: DeviceCategory }> {
    const res = await this.prisma.deviceCategory.delete({
      where: { id: deviceCategoryId },
    });

    return { data: DeviceCategory.fromRaw(res) };
  }
}
