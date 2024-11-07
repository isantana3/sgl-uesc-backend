import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';
import { Token, TokenSchema } from './schemas/tokens.entity';
import { JwtStrategy } from './jwt.strategy'; // Importando o JwtStrategy
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
    }),
  ],
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService, JwtStrategy], // Adicionando o JwtStrategy como provider
  exports: [AuthenticationsService, JwtModule], // Exportando JwtModule se necessário em outros módulos
})
export class AuthenticationsModule {}
