import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BroadCastedMessage } from 'src/message/types/broadcasted.message.type';
/* import { SocketService } from './socket.service';
 */ @WebSocketGateway({ namespace: '/socket' })
export class SocketGateway implements OnGatewayInit {
  private server: Socket;

  afterInit(server: Socket) {
    this.server = server;
  }

  broadcastMessage(message: BroadCastedMessage): void {
    this.server.emit('message', message);
  }
}
