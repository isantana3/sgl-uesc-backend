import { Test, TestingModule } from '@nestjs/testing';
import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';
import { Token, TokenSchema } from './schemas/tokens.entity';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';

describe('AuthenticationsModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MailModule,
        MongooseModule.forRoot(process.env.DB_URL),
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
        forwardRef(() => UsersModule),
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
        }),
      ],
      controllers: [AuthenticationsController],
      providers: [AuthenticationsService],
      exports: [AuthenticationsService],
    }).compile();
  });

  it('should be defined', () => {
    const controller = module.get<AuthenticationsController>(AuthenticationsController);
    const service = module.get<AuthenticationsService>(AuthenticationsService);
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
