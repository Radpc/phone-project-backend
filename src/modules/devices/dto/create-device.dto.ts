import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  partNumber: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  categoryId: number;
}
