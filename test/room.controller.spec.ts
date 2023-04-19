import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from '../src/room/room.controller';
import { RoomService } from '../src/room/room.service';
import { CreateRoomDto } from '../src/room/dtos/create-room.dto';
import { AddUserDto } from '../src/room/dtos/add-user.dto';
import { SendMessageDto } from '../src/room/dtos/send-message.dto';

describe('RoomController', () => {
  let controller: RoomController;
  let service: RoomService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [RoomService],
    }).compile();

    controller = module.get<RoomController>(RoomController);
    service = module.get<RoomService>(RoomService);
  });

  describe('createRoom', () => {
    it('should create a new room', () => {
      const createRoomDto: CreateRoomDto = { name: 'Test Room' };
      const result = { id: '0', name: 'Test Room', users: [], messages: [] };
      jest.spyOn(service, 'createRoom').mockImplementation(() => result);

      expect(controller.createRoom(createRoomDto)).toBe(result);
    });
  });

  describe('addUserToRoom', () => {
    it('should add a user to a room', () => {
      const roomId = '0';
      const addUserDto: AddUserDto = { name: 'Test User' };
      const result = { id: '0', name: 'Test User' };
      jest.spyOn(service, 'addUserToRoom').mockImplementation(() => result);

      expect(controller.addUserToRoom(roomId, addUserDto)).toBe(result);
    });
  });

  describe('sendMessageToRoom', () => {
    it('should send a message to a room', () => {
      const roomId = '0';
      const sendMessageDto: SendMessageDto = {
        content: 'Test Message',
        senderId: '0',
      };
      const result = {
        id: '0',
        content: 'Test Message',
        senderId: '0',
        createdAt: expect.any(Date),
      };
      jest.spyOn(service, 'sendMessageToRoom').mockImplementation(() => result);

      expect(controller.sendMessageToRoom(roomId, sendMessageDto)).toBe(result);
    });
  });

  describe('getLatestRoomMessages', () => {
    it('should get the latest messages from a room', () => {
      const roomId = '0';
      const result = [
        {
          id: '0',
          content: 'Test Message',
          senderId: '0',
          createdAt: new Date(),
        },
      ];
      jest
        .spyOn(service, 'getLatestRoomMessages')
        .mockImplementation(() => result);

      expect(controller.getLatestRoomMessages(roomId)).toBe(result);
    });
  });
});
