import { DeviceCategory as RawDeviceCategory } from 'src/generated/prisma';
import { DeviceCategoryDTO } from '../dto/device-category.dto';

export class DeviceCategory {
  id: number;
  name: string;

  /**
   * Creates a domain based device category entity
   * @param rawDeviceCategory The raw entity from the database
   */
  static fromRaw(rawDeviceCategory: RawDeviceCategory): DeviceCategory {}

  /**
   * Create a DTO for the device category
   */
  toDTO(): DeviceCategoryDTO {}
}
