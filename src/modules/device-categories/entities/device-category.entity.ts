import { DeviceCategory as RawDeviceCategory } from '../../../../generated/prisma';
import { DeviceCategoryDTO } from '../dto/device-category.dto';

interface IProps {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class DeviceCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: IProps) {
    const { id, name } = props;
    this.id = id;
    this.name = name;
  }

  /**
   * Creates a domain based device category entity
   * @param rawDeviceCategory The raw entity from the database
   */
  static fromRaw(rawDeviceCategory: RawDeviceCategory): DeviceCategory {
    return new DeviceCategory({
      id: rawDeviceCategory.id,
      name: rawDeviceCategory.name,
      createdAt: rawDeviceCategory.createdAt,
      updatedAt: rawDeviceCategory.updatedAt,
    });
  }

  /**
   * Create a DTO for the device category
   */
  toDTO(): DeviceCategoryDTO {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.createdAt.toISOString(),
    };
  }
}
