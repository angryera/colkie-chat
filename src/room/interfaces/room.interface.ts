import { User } from './user.interface';
import { Message } from './message.interface';

export interface Room {
  id: string;
  name: string;
  users: User[];
  messages: Message[];
}
