import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  SuccessPaginatedResponse,
  SuccessResponse,
} from 'src/utils/success-response';
import { DeviceDTO } from './dto/device.dto';
import { ServiceError, ServiceErrorType } from 'src/utils/service-error';
import { PaginatedQuery } from 'src/utils/pagination-types';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(
    @Body() createDeviceDto: CreateDeviceDto,
  ): Promise<SuccessResponse<DeviceDTO>> {
    const serviceRes = await this.devicesService.create(createDeviceDto);
    return { data: serviceRes.data.toDTO(), message: 'success' };
  }

  @Get()
  async findAll(
    @Query() query: PaginatedQuery,
  ): Promise<SuccessPaginatedResponse<DeviceDTO>> {
    const serviceRes = await this.devicesService.findAll({
      page: query.page,
      pageSize: query.pageSize,
    });
    return {
      data: {
        items: serviceRes.data.map((i) => i.toDTO()),
        total: serviceRes.total,
      },
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const serviceRes = await this.devicesService.findOne(+id);
      return { data: serviceRes.data.toDTO(), message: 'success' };
    } catch (err) {
      if (err instanceof ServiceError) {
        switch (err.type) {
          case ServiceErrorType.NotFound:
            throw new NotFoundException('Device not found');
        }
      }
      throw new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    const serviceRes = await this.devicesService.update(+id, updateDeviceDto);
    return { data: serviceRes.data.toDTO(), message: 'success' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const serviceRes = await this.devicesService.remove(+id);
    return { data: serviceRes.data.toDTO(), message: 'success' };
  }
}
