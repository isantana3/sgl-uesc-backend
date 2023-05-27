import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AvailableRoomsDto {
  @IsOptional()
  @IsString({ message: 'available deve ser do tipo string' })
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  pavilion: string;

  @IsNotEmpty({ message: 'A startDate é obrigatória' })
  @IsDateString({}, { message: 'A startDate deve ser uma data válida' })
  @ApiProperty({
    example: '2023-06-15T10:00:00.000Z',
    description: 'Data e hora de início da reserva no formato ISO 8601',
  })
  startDate: Date;

  @IsNotEmpty({ message: 'A endDate é obrigatória' })
  @IsDateString({}, { message: 'A endDate deve ser uma data válida' })
  @ApiProperty({
    example: '2023-06-15T12:00:00.000Z',
    description: 'Data e hora de término da reserva no formato ISO 8601',
  })
  endDate: Date;
}
