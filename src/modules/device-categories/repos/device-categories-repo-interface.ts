import { PaginatedQuery } from '../../../utils/pagination-types';
import { CreateDeviceCategoryDto } from '../dto/create-device-category.dto';
import { UpdateDeviceCategoryDto } from '../dto/update-device-category.dto';
import { DeviceCategory } from '../entities/device-category.entity';

export type ICreateDeviceCategory = CreateDeviceCategoryDto;
export type IUpdateDeviceCategory = UpdateDeviceCategoryDto;

export interface IListDeviceCategoryParams extends PaginatedQuery {
  searchBy?: string;
}

export interface DeviceCategoriesRepoInterface {
  /**
   * Creates a new device category in the database.
   * @param payload The parameters for the creation of the device-category
   */
  create(payload: ICreateDeviceCategory): Promise<{ data: DeviceCategory }>;
  update(
    deviceCategoryId: number,
    payload: IUpdateDeviceCategory,
  ): Promise<{ data: DeviceCategory }>;
  get(deviceCategoryId: number): Promise<{ data: DeviceCategory }>;
  list(
    params: IListDeviceCategoryParams,
  ): Promise<{ data: DeviceCategory[]; total: number }>;
  delete(deviceCategoryId: number): Promise<{ data: DeviceCategory }>;
}
