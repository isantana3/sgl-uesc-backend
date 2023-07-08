import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ISemester, TStatus } from '../schemas/reservation.schemas';

export class CreateReservationDto {
  @IsString({ message: 'O label deve ser do tipo string' })
  @IsNotEmpty({ message: 'O label é obrigatório' })
  @ApiProperty({
    example: 'Aula de programação 1',
    examples: [
      'Palestra TecnoJr',
      'Minicurso de Geografia',
      'Reserva Auditório João Gomes',
    ],
  })
  label: string;

  @IsString({ message: 'A previousObservation deve ser do tipo string' })
  @IsNotEmpty({ message: 'A previousObservation é obrigatório' })
  @ApiProperty({
    example: 'Ventilador não estava funcionando',
    examples: [
      'Ventilador não estava funcionando',
      'Sem data-show',
      'Ar-condicionado quebrado',
    ],
  })
  previousObservation: string;

  @IsOptional()
  @IsString({
    message: 'A laterObservation deve ser do tipo string',
  })
  @ApiProperty({
    example: 'Ventilador parou de funcionar',
    examples: [
      'Ventilador parou de funcionar',
      'Data-show quebrou',
      'Ar-condicionado não está desligando',
    ],
  })
  laterObservation: string;

  @IsString({ message: 'responsible deve ser do tipo string' })
  @IsNotEmpty({ message: 'responsible é obrigatório' })
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  responsible: string;

  @IsString({ message: 'room deve ser do tipo string' })
  @IsNotEmpty({ message: 'room é obrigatório' })
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  room: string;

  @ApiProperty({
    example: '2023-06-15T10:00:00.000Z',
    description: 'Data e hora de início da reserva no formato ISO 8601',
  })
  startDate: Date;

  @IsNotEmpty({ message: 'A data de término é obrigatória' })
  @ApiProperty({
    example: '2023-06-15T12:00:00.000Z',
    description: 'Data e hora de término da reserva no formato ISO 8601',
  })
  endDate: Date;

  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsEnum(['reserved', 'cancelled', 'finished'], {
    message: 'O status deve: reserved, cancelled ou finished',
  })
  @ApiProperty({
    example: 'reserved',
    description: 'Indica se a reserva foi confirmada, finalizada ou cancelada',
    examples: ['reserved', 'cancelled', 'finished'],
  })
  status: TStatus;

  @IsOptional()
  @ApiProperty({
    description: 'Indica se a reserva vai ser semestral ou não',
  })
  semester?: ISemester;
}
