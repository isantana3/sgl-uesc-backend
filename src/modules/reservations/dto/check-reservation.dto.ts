import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CheckReservationDto {
  @IsString({ message: 'room deve ser do tipo string' })
  @IsNotEmpty({ message: 'room é obrigatório' })
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  room: string;

  @IsNotEmpty({ message: 'A startDate é obrigatória' })
  @IsDateString({}, { message: 'A startDate deve ser uma data válida' })
  @ApiProperty({
    example: '2023-06-15T10:00:00.000Z',
    description: 'Data e hora de início da reserva no formato ISO 8601',
  })
  startDate: Date;

  @IsNotEmpty({ message: 'A data de término é obrigatória' })
  @IsDateString({}, { message: 'A data de término deve ser uma data válida' })
  @ApiProperty({
    example: '2023-06-15T12:00:00.000Z',
    description: 'Data e hora de término da reserva no formato ISO 8601',
  })
  endDate: Date;
}
