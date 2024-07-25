import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEnum(MessageType)
  @ApiProperty()
  messageType: MessageType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupId: string;

  @ApiProperty()
  payload: object;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  destinationUsername?: string;
}
