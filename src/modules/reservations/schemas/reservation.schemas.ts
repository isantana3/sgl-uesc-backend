import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from '../../rooms/schemas/room.schemas';
import { User } from '../../users/schemas/user.schemas';

export type ReservationDocument = HydratedDocument<Reservation>;
export type TStatus = 'reserved' | 'cancelled' | 'finished';
export interface ISemester {
  startDate: Date;
  endDate: Date;
  type: 'weekly';
}

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

  @Prop({ type: {} })
  semester: ISemester;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
