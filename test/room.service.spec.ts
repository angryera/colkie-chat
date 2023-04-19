import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from '../src/room/room.service';
import { CreateRoomDto } from '../src/room/dtos/create-room.dto';
import { AddUserDto } from '../src/room/dtos/add-user.dto';
import { SendMessageDto } from '../src/room/dtos/send-message.dto';

describe('RoomService', () => {
  let roomService: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomService],
    }).compile();

    roomService = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(roomService).toBeDefined();
  });

  describe('createRoom', () => {
    it('should create a new room', () => {
      const createRoomDto: CreateRoomDto = { name: 'Test Room' };
      const room = roomService.createRoom(createRoomDto);
      expect(room).toBeDefined();
      expect(room.id).toBeDefined();
      expect(room.name).toBe('Test Room');
      expect(room.users).toHaveLength(0);
      expect(room.messages).toHaveLength(0);
    });
  });

  describe('addUserToRoom', () => {
    it('should add a user to a room', () => {
      const createRoomDto: CreateRoomDto = { name: 'Test Room' };
      const room = roomService.createRoom(createRoomDto);

      const addUserDto: AddUserDto = { name: 'John Doe' };
      const user = roomService.addUserToRoom(room.id, addUserDto);

      expect(user.name).toEqual(addUserDto.name);
      expect(room.users.length).toEqual(1);
    });
  });

  describe('sendMessageToRoom', () => {
    it('should send a message to a room', () => {
      const createRoomDto: CreateRoomDto = { name: 'Test Room' };
      const room = roomService.createRoom(createRoomDto);

      const sendMessageDto: SendMessageDto = {
        content: 'Hello, world!',
        senderId: '1',
      };
      const message = roomService.sendMessageToRoom(room.id, sendMessageDto);

      expect(message.content).toEqual(sendMessageDto.content);
      expect(message.senderId).toEqual(sendMessageDto.senderId);
      expect(room.messages.length).toEqual(1);
    });
  });

  describe('getLatestRoomMessages', () => {
    it('should return the latest messages from a room', () => {
      const createRoomDto: CreateRoomDto = { name: 'Test Room' };
      const room = roomService.createRoom(createRoomDto);

      const sendMessageDto: SendMessageDto = {
        content: 'Message 1',
        senderId: '1',
      };
      roomService.sendMessageToRoom(room.id, sendMessageDto);

      const sendMessageDto2: SendMessageDto = {
        content: 'Message 2',
        senderId: '2',
      };
      roomService.sendMessageToRoom(room.id, sendMessageDto2);

      const latestMessages = roomService.getLatestRoomMessages(room.id);
      expect(latestMessages.length).toEqual(2);
      expect(latestMessages[0].content).toEqual(sendMessageDto.content);
      expect(latestMessages[1].content).toEqual(sendMessageDto2.content);
    });

    it('should return an empty array if the room does not exist', () => {
      const latestMessages =
        roomService.getLatestRoomMessages('invalid-room-id');
      expect(latestMessages.length).toEqual(0);
    });
  });
});
