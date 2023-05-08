import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from 'src/modules/rooms/schemas/room.schemas';

export type InventoryDocument = HydratedDocument<Inventory>;
@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Room.name,
  })
  roomId: Room;

  @Prop()
  description: string;

  @Prop()
  observation: string;
}
export const InventorySchema = SchemaFactory.createForClass(Inventory);
