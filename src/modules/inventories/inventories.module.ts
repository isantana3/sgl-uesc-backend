import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './schemas/inventory.schemas';
import { RoomsModule } from 'src/modules/rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
    RoomsModule,
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule {}
