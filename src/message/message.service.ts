import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessageType, Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
  ) {}

  messageIncludes = Prisma.validator<Prisma.MessageInclude>()({
    createdUser: true,
    destinationUser: true,
  });

  async create(createMessageDto: CreateMessageDto) {
    const createdUser = await this.user.findOne(createMessageDto.username);

    let destinationUser = null;

    if (createMessageDto.messageType === MessageType.WelcomeMessage) {
      if (!createMessageDto.destinationUsername) {
        throw new BadRequestException('destinationUsername is required');
      }
      destinationUser = await this.user.findOne(
        createMessageDto.destinationUsername,
      );
    }

    return await this.prisma.message.create({
      data: {
        messageType: createMessageDto.messageType,
        createdUser: {
          connect: {
            id: createdUser.id,
          },
        },
        ...(destinationUser && {
          destinationUser: {
            connect: {
              id: destinationUser.id,
            },
          },
        }),
        groupId: createMessageDto.groupId,
        payload: createMessageDto.payload,
      },
      include: this.messageIncludes,
    });
  }

  async findAll(username: string) {
    const user = await this.user.findOne(username);

    const notInMessageIds = await this.prisma.messageConsumption.findMany({
      where: {
        userId: user.id,
      },
      select: {
        messageId: true,
      },
    });

    const messages = await this.prisma.message.findMany({
      include: this.messageIncludes,
      where: {
        NOT: {
          id: {
            in: notInMessageIds.map(
              (notInMessageId) => notInMessageId.messageId,
            ),
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    // insert to message consumption
    await this.prisma.messageConsumption.createMany({
      data: messages.map((message) => ({
        userId: user.id,
        messageId: message.id,
      })),
    });

    return messages;
  }
}
