import { MessageType } from '@prisma/client';

export class Message {
  userId: string;
  messageType: MessageType;
  groupId: string;
  payload: object;
  createdAt: Date;
}
