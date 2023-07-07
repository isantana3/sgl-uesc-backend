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

  @ApiProperty({
    example: '2023-06-15',
    description: 'Data da reserva no formato YYYY-MM-DD',
  })
  day: string;

  @ApiProperty({
    example: '17:00',
    description: 'Hora início da reserva no formato HH-MM',
  })
  startHour: string;

  @ApiProperty({
    example: '18:00',
    description: 'Hora início da reserva no formato HH-MM',
  })
  endHour: string;
}
