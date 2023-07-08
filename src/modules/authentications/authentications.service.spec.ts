// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthenticationsService } from './authentications.service';
// import { Token, TokenSchema } from './schemas/tokens.entity'; // Importe o Token
// import { JwtService } from '@nestjs/jwt';
// import { MailService } from '../mail/mail.service';
// import { UsersService } from '../users/users.service';
// import { User } from '../users/schemas/user.schemas';
// import { RootTestModule } from '../../../test/root-test.module';
// import { MongooseModule } from '@nestjs/mongoose';

// describe('AuthenticationsService', () => {
//   let service: AuthenticationsService;
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
      
//       providers: [
//         AuthenticationsService,
//         Token,
//         JwtService,
//         MailService,
//         UsersService,
//         User
//       ],
//       imports: [
//         RootTestModule,
//         MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
//       ]
//     }).compile();

//     service = module.get<AuthenticationsService>(AuthenticationsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
