import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService, UserService, SocketGateway],
})
export class MessageModule {}
