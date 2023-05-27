import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation, ReservationSchema } from './schemas/reservation.schemas';
import { UsersModule } from '../users/users.module';
import { RoomsModule } from '../rooms/rooms.module';
import { Room, RoomSchema } from '../rooms/schemas/room.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
    UsersModule,
    RoomsModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
