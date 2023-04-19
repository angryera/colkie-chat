// room.controller.ts

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @Post(':roomId/users')
  addUserToRoom(
    @Param('roomId') roomId: string,
    @Body() addUserDto: AddUserDto,
  ) {
    return this.roomService.addUserToRoom(roomId, addUserDto);
  }

  @Post(':roomId/messages')
  sendMessageToRoom(
    @Param('roomId') roomId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.roomService.sendMessageToRoom(roomId, sendMessageDto);
  }

  @Get(':roomId/messages')
  getLatestRoomMessages(@Param('roomId') roomId: string) {
    return this.roomService.getLatestRoomMessages(roomId);
  }
}
