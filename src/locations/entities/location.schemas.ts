import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type LocationDocument = HydratedDocument<Location>;

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true })
  label: string;

  @Prop()
  description: string;

  @Prop()
  observation: string;
}
export const LocationSchema = SchemaFactory.createForClass(Location);
