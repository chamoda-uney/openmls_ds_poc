import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const user = await this.user.findOne(createMessageDto.userId);

    return await this.prisma.message.create({
      data: {
        userId: user.id,
        messageType: createMessageDto.messageType,
        groupId: createMessageDto.groupId,
        payload: createMessageDto.payload,
      },
    });
  }
}
