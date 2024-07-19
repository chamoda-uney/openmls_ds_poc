import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateUserKeyPackageDto {
  @IsObject()
  @ApiProperty()
  keyPackage: object;
}
