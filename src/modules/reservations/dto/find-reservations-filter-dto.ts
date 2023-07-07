import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FindReservationFilterDto {
  @IsOptional()
  @ApiProperty({ examples: ['2022-03-01', '2022-03-01T18:00:00.000Z'] })
  startHour?: string;

  @IsOptional()
  @ApiProperty({ examples: ['2022-03-01', '2022-03-01T18:00:00.000Z'] })
  endHour?: string;

  @IsOptional()
  @IsString({ message: 'room deve ser do tipo string' })
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  room: string;

  @IsString({ message: 'responsible deve ser do tipo string' })
  @IsOptional()
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  responsible: string;

  @IsString({ message: 'pavilion deve ser do tipo string' })
  @IsOptional()
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  pavilion: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;
}
