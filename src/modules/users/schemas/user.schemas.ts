import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
// Professor
// Alguém do colegiado
// Diretor de alguma coisa
export type TRole = 'admin' | 'manager' | 'user';
export type TOffice = 'professor' | 'student' | 'technician';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  registration: string; // Matrícula

  @Prop({ required: true })
  office: TOffice; // Cargo

  @Prop({ required: true })
  role: TRole;

  @Prop({ default: null })
  deleted_at: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
