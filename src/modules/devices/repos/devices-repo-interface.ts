import { PaginatedQuery } from '../../../utils/pagination-types';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { Device } from '../entities/device.entity';

export type ICreateDevice = CreateDeviceDto;
export type IUpdateDevice = UpdateDeviceDto;

export interface IListDeviceParams extends PaginatedQuery {
  searchBy?: string;
}

export interface DevicesRepoInterface {
  create(payload: ICreateDevice): Promise<{ data: Device }>;
  update(deviceId: number, payload: IUpdateDevice): Promise<{ data: Device }>;
  get(deviceId: number): Promise<{ data: Device }>;
  list(params: IListDeviceParams): Promise<{ data: Device[]; total: number }>;
  delete(deviceId: number): Promise<{ data: Device }>;
}
