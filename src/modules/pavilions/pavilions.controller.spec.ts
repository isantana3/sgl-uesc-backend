import { Test, TestingModule } from '@nestjs/testing';
import { PavilionsController } from './pavilions.controller';
import { PavilionsService } from './pavilions.service';

describe('PavilionsController', () => {
  let controller: PavilionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PavilionsController],
      providers: [PavilionsService],
    }).compile();

    controller = module.get<PavilionsController>(PavilionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
