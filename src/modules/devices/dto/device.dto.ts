import { DeviceCategoryDTO } from 'src/modules/device-categories/dto/device-category.dto';

export interface DeviceDTO {
  id: number;
  color: string;
  partNumber: number;
  category?: DeviceCategoryDTO;
  createdAt: string;
  updatedAt: string;
}
