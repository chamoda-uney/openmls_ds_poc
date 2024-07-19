import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsEnum(MessageType)
  @ApiProperty()
  messageType: MessageType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupId: string;

  @IsObject()
  @ApiProperty()
  payload: object;
}
