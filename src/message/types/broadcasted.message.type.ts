import { MessageType } from '@prisma/client';

export interface BroadCastedMessage {
  createdUsername: string;
  destinationUsername?: string;
  messageType: MessageType;
  groupId: string;
}
