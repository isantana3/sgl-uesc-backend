import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ISemester, TDayWeek } from '../schemas/reservation.schemas';

export class CheckReservationDto {
  @IsString({ message: 'room deve ser do tipo string' })
  @IsNotEmpty({ message: 'room é obrigatório' })
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  room: string;

  @IsNotEmpty({ message: 'A day é obrigatória' })
  @ApiProperty({
    example: '2023-06-15',
    description: 'Data da reserva no formato YYYY-MM-DD',
  })
  day: string;

  @IsNotEmpty({ message: 'A startHour é obrigatória' })
  @ApiProperty({
    example: '17:00',
    description: 'Hora início da reserva no formato HH-MM',
  })
  startHour: string;

  @IsNotEmpty({ message: 'A endHour é obrigatória' })
  @ApiProperty({
    example: '18:00',
    description: 'Hora início da reserva no formato HH-MM',
  })
  endHour: string;

  @IsOptional()
  @ApiProperty({
    description: 'Indica se a reserva vai ser semestral ou não',
  })
  semester?: ISemester;

  @IsOptional()
  @ApiProperty({
    description: 'Dia da semana',
  })
  dayWeek?: TDayWeek;
}
