import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type PavilionDocument = HydratedDocument<Pavilion>;

@Schema({ timestamps: true })
export class Pavilion {
  @Prop({ required: true })
  label: string;

  @Prop()
  description: string;

  @Prop()
  observation: string;

  constructor(partial?: Partial<Pavilion>) {
    Object.assign(this, partial);
  }
}
export const PavilionSchema = SchemaFactory.createForClass(Pavilion);
