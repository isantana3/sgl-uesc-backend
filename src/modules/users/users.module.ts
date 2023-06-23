import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { MailModule } from '../mail/mail.module';
import { AuthenticationsModule } from '../authentications/authentications.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
    forwardRef(() => AuthenticationsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
