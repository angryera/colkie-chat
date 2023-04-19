// room.service.ts

import { Injectable } from '@nestjs/common';
import { Room } from './interfaces/room.interface';
import { User } from './interfaces/user.interface';
import { Message } from './interfaces/message.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserDto } from './dto/add-user.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class RoomService {
  private readonly rooms: Room[] = [];

  createRoom(createRoomDto: CreateRoomDto): Room {
    const room: Room = {
      id: this.rooms.length.toString(),
      name: createRoomDto.name,
      users: [],
      messages: [],
    };
    this.rooms.push(room);
    return room;
  }

  addUserToRoom(roomId: string, addUserDto: AddUserDto): User {
    const room = this.rooms.find((room) => room.id === roomId);
    const user: User = {
      id: room.users.length.toString(),
      name: addUserDto.name,
    };
    room.users.push(user);
    return user;
  }

  sendMessageToRoom(roomId: string, sendMessageDto: SendMessageDto): Message {
    const room = this.rooms.find((room) => room.id === roomId);
    const message: Message = {
      id: room.messages.length.toString(),
      content: sendMessageDto.content,
      senderId: sendMessageDto.senderId,
      createdAt: new Date(),
    };
    room.messages.push(message);
    return message;
  }

  getLatestRoomMessages(roomId: string): Message[] {
    const room = this.rooms.find((room) => room.id === roomId);
    if (room) {
      const latestMessages = room.messages.slice(
        Math.max(room.messages.length - 10, 0),
      );
      return latestMessages;
    } else {
      return [];
    }
  }
}
