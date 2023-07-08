import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PavilionsModule } from '../pavilions/pavilions.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room, RoomSchema } from './schemas/room.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    PavilionsModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
