import { Test, TestingModule } from '@nestjs/testing';
import { forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { User, UserSchema } from './schemas/user.schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MailModule } from '../mail/mail.module';
import { AuthenticationsModule } from '../authentications/authentications.module';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.DB_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MailModule,
        forwardRef(() => AuthenticationsModule),
        UsersModule,
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    const usersModule = module.get<UsersModule>(UsersModule);
    expect(usersModule).toBeDefined();
  });

  it('should have a UsersController instance', () => {
    const usersController = module.get<UsersController>(UsersController);
    expect(usersController).toBeDefined();
  });

  it('should have a UsersService instance', () => {
    const usersService = module.get<UsersService>(UsersService);
    expect(usersService).toBeDefined();
  });
});
