import { Test, TestingModule } from '@nestjs/testing';
import { MailModule } from './mail.module';
import { MailService } from './mail.service';

describe('MailModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MailModule],
      providers: [MailService],
      exports: [MailService],
    }).compile();
  });

  it('should be defined', () => {
    const service = module.get<MailService>(MailService);
    expect(service).toBeDefined();
  });
});
