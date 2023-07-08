import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    const module = app.get<AppModule>(AppModule);
    expect(module).toBeDefined();
  });

  it('should have an AppController instance', () => {
    const controller = app.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });

  it('should have an AppService instance', () => {
    const service = app.get<AppService>(AppService);
    expect(service).toBeDefined();
  });
});
