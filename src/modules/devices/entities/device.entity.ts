import { DeviceCategory } from '../../../modules/device-categories/entities/device-category.entity';
import {
  Device as RawDevice,
  DeviceCategory as RawDeviceCategory,
} from '../../../../generated/prisma';
import { DeviceDTO } from '../dto/device.dto';
interface IProps {
  id: number;
  color: string;
  partNumber: number;
  category?: DeviceCategory;

  createdAt: Date;
  updatedAt: Date;
}

type RawDeviceWithRelations = RawDevice & { category?: RawDeviceCategory };
export class Device {
  id: number;
  color: string;
  partNumber: number;
  category: DeviceCategory | undefined;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: IProps) {
    const { category, color, createdAt, id, partNumber, updatedAt } = props;
    this.id = id;
    this.partNumber = partNumber;
    this.category = category;
    this.color = color;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Creates a domain based device entity
   * @param rawDevice The raw entity from the database
   */
  static fromRaw(rawDevice: RawDeviceWithRelations): Device {
    return new Device({
      id: rawDevice.id,
      partNumber: rawDevice.partNumber,
      color: rawDevice.color,
      category: rawDevice.category
        ? DeviceCategory.fromRaw(rawDevice.category)
        : undefined,
      createdAt: rawDevice.createdAt,
      updatedAt: rawDevice.updatedAt,
    });
  }

  /**
   * Create a DTO for the device
   */
  toDTO(): DeviceDTO {
    return {
      id: this.id,
      color: this.color,
      partNumber: this.partNumber,
      category: this.category?.toDTO(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
