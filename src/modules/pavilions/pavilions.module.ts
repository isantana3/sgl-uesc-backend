import { Module } from '@nestjs/common';
import { PavilionsService } from './pavilions.service';
import { PavilionsController } from './pavilions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pavilion, PavilionSchema } from './schemas/pavilion.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pavilion.name, schema: PavilionSchema },
    ]),
  ],
  controllers: [PavilionsController],
  providers: [PavilionsService],
  exports: [PavilionsService],
})
export class PavilionsModule {}
