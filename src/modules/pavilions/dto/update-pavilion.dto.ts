import { PartialType } from '@nestjs/swagger';
import { CreatePavilionDto } from './create-pavilion.dto';

export class UpdatePavilionDto extends PartialType(CreatePavilionDto) {}
