import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schemas';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    RoomsModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
