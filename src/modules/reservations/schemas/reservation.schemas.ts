import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from 'src/modules/rooms/schemas/room.schemas';
import { User } from 'src/modules/users/schemas/user.schemas';

export type ReservationDocument = HydratedDocument<Reservation>;
export type TStatus = 'reserved' | 'cancelled' | 'finished';

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  previousObservation: string;

  @Prop()
  laterObservation: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  responsible: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Room.name,
  })
  room: Room;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: 'reserved', required: true })
  status: TStatus;

  @Prop({ default: null })
  deleted_at: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
