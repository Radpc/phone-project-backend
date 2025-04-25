import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginatedQuery } from '../../../utils/pagination-types';

export class ListDeviceCategoryQueryDTO extends PaginatedQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchBy?: string;
}
