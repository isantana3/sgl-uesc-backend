import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from 'src/modules/rooms/schemas/room.schemas';
import { User } from 'src/modules/users/schemas/user.schemas';

export type ReservationDocument = HydratedDocument<Reservation>;
export type TStatus = 'reserved' | 'cancelled' | 'finished';
export type TDayWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
export interface ISemester {
  startDay: string;
  endDay: string;
  dayWeek: TDayWeek;
  type: 'weekly' | 'month';
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

  @Prop({})
  day: number;

  @Prop({})
  dayWeek: TDayWeek;

  @Prop({ required: true })
  endHour: number;

  @Prop({ required: true })
  startHour: number;

  @Prop({ default: 'reserved', required: true })
  status: TStatus;


  @Prop({ default: null })
  deleted_at: Date;

  @Prop({ type: {} })
  semester: ISemester;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
