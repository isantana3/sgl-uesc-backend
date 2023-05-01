import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  locationId: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
