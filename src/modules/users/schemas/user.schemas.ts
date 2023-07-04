import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
// Professor
// Alguém do colegiado
// Diretor de alguma coisa
export type TRole = 'admin' | 'manager' | 'user';

@Schema({ timestamps: true })
export class User {
  @Prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  registration: string; // Matrícula

  @Prop({ required: true })
  office: string; // Cargo

  @Prop({ required: true })
  role: TRole;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
