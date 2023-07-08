import { Test, TestingModule } from '@nestjs/testing';
import { forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PavilionsModule } from './pavilions.module';
import { Pavilion, PavilionSchema } from './schemas/pavilion.schemas';
import { PavilionsController } from './pavilions.controller';
import { PavilionsService } from './pavilions.service';
import { MailModule } from '../mail/mail.module';
import { AuthenticationsModule } from '../authentications/authentications.module';

describe('PavilionsModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.DB_URL),
        MongooseModule.forFeature([{ name: Pavilion.name, schema: PavilionSchema }]),
        MailModule,
        forwardRef(() => AuthenticationsModule),
        PavilionsModule,
      ],
      controllers: [PavilionsController],
      providers: [PavilionsService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    const pavilionsModule = module.get<PavilionsModule>(PavilionsModule);
    expect(pavilionsModule).toBeDefined();
  });

  it('should have a PavilionsController instance', () => {
    const pavilionsController = module.get<PavilionsController>(PavilionsController);
    expect(pavilionsController).toBeDefined();
  });

  it('should have a PavilionsService instance', () => {
    const pavilionsService = module.get<PavilionsService>(PavilionsService);
    expect(pavilionsService).toBeDefined();
  });
});
