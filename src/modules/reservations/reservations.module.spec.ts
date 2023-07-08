import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsModule } from './reservations.module';
import { Reservation, ReservationSchema } from './schemas/reservation.schemas';
import { UsersModule } from '../users/users.module';
import { RoomsModule } from '../rooms/rooms.module';
import { Room, RoomSchema } from '../rooms/schemas/room.schemas';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

describe('ReservationsModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.DB_URL),
        MongooseModule.forFeature([
          { name: Reservation.name, schema: ReservationSchema },
          { name: Room.name, schema: RoomSchema },
        ]),
        UsersModule,
        RoomsModule,
        ReservationsModule,
      ],
      controllers: [ReservationsController],
      providers: [ReservationsService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    const reservationsModule = module.get<ReservationsModule>(ReservationsModule);
    expect(reservationsModule).toBeDefined();
  });

  it('should have a ReservationsController instance', () => {
    const reservationsController = module.get<ReservationsController>(ReservationsController);
    expect(reservationsController).toBeDefined();
  });

  it('should have a ReservationsService instance', () => {
    const reservationsService = module.get<ReservationsService>(ReservationsService);
    expect(reservationsService).toBeDefined();
  });
});
