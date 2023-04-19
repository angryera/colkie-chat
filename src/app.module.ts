import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomService } from './room/room.service';
import { RoomController } from './room/room.controller';

@Module({
  imports: [],
  controllers: [AppController, RoomController],
  providers: [AppService, RoomService],
})
export class AppModule {}
