import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceCategoryDto } from './dto/create-device-category.dto';
import { UpdateDeviceCategoryDto } from './dto/update-device-category.dto';
import { DeviceCategoriesRepoInterface } from './repos/device-categories-repo-interface';
import { ListDeviceCategoryQueryDTO } from './dto/list-device-category-query.dto';

@Injectable()
export class DeviceCategoriesService {
  constructor(
    @Inject('IDeviceCategoriesRepo')
    private readonly deviceCategoryRepo: DeviceCategoriesRepoInterface,
  ) {}

  create(createDeviceCategoryDto: CreateDeviceCategoryDto) {
    return this.deviceCategoryRepo.create({
      name: createDeviceCategoryDto.name,
    });
  }

  findAll(options: ListDeviceCategoryQueryDTO) {
    return this.deviceCategoryRepo.list({
      page: options.page,
      pageSize: options.pageSize,
      searchBy: options.searchBy,
    });
  }

  findOne(id: number) {
    return this.deviceCategoryRepo.get(id);
  }

  update(id: number, updateDeviceCategoryDto: UpdateDeviceCategoryDto) {
    return this.deviceCategoryRepo.update(id, {
      name: updateDeviceCategoryDto.name,
    });
  }

  remove(id: number) {
    return this.deviceCategoryRepo.delete(id);
  }
}
