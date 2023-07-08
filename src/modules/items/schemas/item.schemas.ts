import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from 'src/modules/rooms/schemas/room.schemas';

export type ItemDocument = HydratedDocument<Item>;
@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Room.name,
  })
  room: Room;

  @Prop()
  description: string;

  @Prop()
  observation: string;

  @Prop({ default: null })
  deleted_at: Date;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
