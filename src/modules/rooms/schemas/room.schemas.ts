import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Location } from 'src/modules/locations/schemas/location.schemas';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  label: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Location.name,
  })
  @Expose({ name: 'location' })
  locationId: Location;

  constructor(partial?: Partial<Room>) {
    Object.assign(this, partial);
  }
}

export const RoomSchema = SchemaFactory.createForClass(Room);
