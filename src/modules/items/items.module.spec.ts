import { Test, TestingModule } from '@nestjs/testing';
import { ItemsModule } from './items.module';
import { forwardRef } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schemas';
import { RoomsModule } from '../rooms/rooms.module';
import { MailModule } from '../mail/mail.module';
import { AuthenticationsModule } from '../authentications/authentications.module';

describe('ItemsModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.DB_URL),
        MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
        RoomsModule,
        ItemsModule,
        MailModule,
        forwardRef(() => AuthenticationsModule),
      ],
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    const itemsModule = module.get<ItemsModule>(ItemsModule);
    expect(itemsModule).toBeDefined();
  });

  it('should have an ItemsController instance', () => {
    const itemsController = module.get<ItemsController>(ItemsController);
    expect(itemsController).toBeDefined();
  });

  it('should have an ItemsService instance', () => {
    const itemsService = module.get<ItemsService>(ItemsService);
    expect(itemsService).toBeDefined();
  });
});
