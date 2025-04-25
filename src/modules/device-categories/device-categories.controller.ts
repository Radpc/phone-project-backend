import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { DeviceCategoriesService } from './device-categories.service';
import { CreateDeviceCategoryDto } from './dto/create-device-category.dto';
import { UpdateDeviceCategoryDto } from './dto/update-device-category.dto';
import {
  SuccessPaginatedResponse,
  SuccessResponse,
} from 'src/utils/success-response';
import { DeviceCategoryDTO } from './dto/device-category.dto';
import { ListDeviceCategoryQueryDTO } from './dto/list-device-category-query.dto';
import { ServiceError, ServiceErrorType } from 'src/utils/service-error';

@Controller('device-categories')
export class DeviceCategoriesController {
  constructor(
    private readonly deviceCategoriesService: DeviceCategoriesService,
  ) {}

  @Post()
  async create(
    @Body() createDeviceCategoryDto: CreateDeviceCategoryDto,
  ): Promise<SuccessResponse<DeviceCategoryDTO>> {
    try {
      const res = await this.deviceCategoriesService.create(
        createDeviceCategoryDto,
      );
      return { data: res.data.toDTO(), message: 'success' };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get()
  async findAll(
    @Query() query: ListDeviceCategoryQueryDTO,
  ): Promise<SuccessPaginatedResponse<DeviceCategoryDTO>> {
    try {
      const res = await this.deviceCategoriesService.findAll({
        page: query.page,
        pageSize: query.pageSize,
        searchBy: query.searchBy,
      });

      return {
        data: { items: res.data.map((r) => r.toDTO()), total: res.total },
        message: 'success',
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<SuccessResponse<DeviceCategoryDTO>> {
    try {
      const res = await this.deviceCategoriesService.findOne(+id);
      return { data: res.data.toDTO(), message: 'success' };
    } catch (err) {
      if (err instanceof ServiceError) {
        switch (err.type) {
          case ServiceErrorType.NotFound:
            throw new NotFoundException('Categoria não encontrada');
        }
      }
      throw new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeviceCategoryDto: UpdateDeviceCategoryDto,
  ): Promise<SuccessResponse<DeviceCategoryDTO>> {
    const res = await this.deviceCategoriesService.update(+id, {
      name: updateDeviceCategoryDto.name,
    });
    return { data: res.data.toDTO(), message: 'success' };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<SuccessResponse<DeviceCategoryDTO>> {
    const res = await this.deviceCategoriesService.remove(+id);
    return { data: res.data.toDTO(), message: 'success' };
  }
}
