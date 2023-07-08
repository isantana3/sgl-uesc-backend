// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthenticationsController } from './authentications.controller';
// import { AuthenticationsService } from './authentications.service';
// import { Token, TokenSchema } from './schemas/tokens.entity'; // Importe o Token
// import { JwtService } from '@nestjs/jwt';
// import { MailService } from '../mail/mail.service';
// import { UsersService } from '../users/users.service';
// import { RootTestModule } from '../../../test/root-test.module';
// import { MongooseModule } from '@nestjs/mongoose';


// describe('AuthenticationsController', () => {
//   let controller: AuthenticationsController;


//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthenticationsController],
//       providers: [
//         AuthenticationsService,
//         Token, 
//         JwtService,
//         MailService,
//         UsersService,
//       ],
//       imports: [
//         RootTestModule,
//         MongooseModule.forRoot(process.env.DB_URL),
//         MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
//       ],
//     }).compile();

//     controller = module.get<AuthenticationsController>(AuthenticationsController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
