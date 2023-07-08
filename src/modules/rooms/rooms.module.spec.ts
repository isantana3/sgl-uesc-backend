import { Test, TestingModule } from '@nestjs/testing';
import { RoomsModule } from './rooms.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schemas';
import { PavilionsModule } from '../pavilions/pavilions.module';
import { MailModule } from '../mail/mail.module';
import { AuthenticationsModule } from '../authentications/authentications.module';
import { forwardRef } from '@nestjs/common';

describe('RoomsModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.DB_URL),
        MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
        PavilionsModule,
        MailModule,
        forwardRef(() => AuthenticationsModule),
        RoomsModule,
      ],
      controllers: [RoomsController],
      providers: [RoomsService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    const roomsModule = module.get<RoomsModule>(RoomsModule);
    expect(roomsModule).toBeDefined();
  });

  it('should have a RoomsController instance', () => {
    const roomsController = module.get<RoomsController>(RoomsController);
    expect(roomsController).toBeDefined();
  });

  it('should have a RoomsService instance', () => {
    const roomsService = module.get<RoomsService>(RoomsService);
    expect(roomsService).toBeDefined();
  });
});
