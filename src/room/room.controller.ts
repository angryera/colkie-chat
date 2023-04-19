// room.controller.ts

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AddUserDto } from './dtos/add-user.dto';
import { CreateRoomDto } from './dtos/create-room.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { RoomService } from './room.service';

@Controller('room')
@ApiTags('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // Creates a new room
  // POST /room
  // Body: { name: string }
  // Returns the newly created room
  @Post()
  @ApiOkResponse({ description: 'Room created successfully' })
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  // Adds a user to a room
  // POST /room/:roomId/users
  // Params: { roomId: string }
  // Body: { name: string }
  // Returns the newly added user
  @Post(':roomId/users')
  @ApiOkResponse({ description: 'User added successfully' })
  addUserToRoom(
    @Param('roomId') roomId: string,
    @Body() addUserDto: AddUserDto,
  ) {
    return this.roomService.addUserToRoom(roomId, addUserDto);
  }

  // Sends a message to a room
  // POST /room/:roomId/messages
  // Params: { roomId: string }
  // Body: { content: string, senderId: string }
  // Returns the newly sent message
  @Post(':roomId/messages')
  @ApiOkResponse({ description: 'Message sent successfully' })
  sendMessageToRoom(
    @Param('roomId') roomId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.roomService.sendMessageToRoom(roomId, sendMessageDto);
  }

  // Gets the latest messages from a room (up to 10)
  // GET /room/:roomId/messages
  // Params: { roomId: string }
  // Returns an array of the latest messages in the room
  @Get(':roomId/messages')
  @ApiOkResponse({ description: 'Latest room messages retrieved successfully' })
  getLatestRoomMessages(@Param('roomId') roomId: string) {
    return this.roomService.getLatestRoomMessages(roomId);
  }
}
