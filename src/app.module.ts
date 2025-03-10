import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [UserModule, MessageModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
