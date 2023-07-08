import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// Precisou ser alterado pois estava dendo erro nos testes
import { User } from '../../users/schemas/user.schemas';

export type TokenDocument = HydratedDocument<Token>;
@Schema({ timestamps: true })
export class Token {
  @Prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId: User;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  isRevoked: boolean;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  tokenExpiration: Date;
}
export const TokenSchema = SchemaFactory.createForClass(Token);
