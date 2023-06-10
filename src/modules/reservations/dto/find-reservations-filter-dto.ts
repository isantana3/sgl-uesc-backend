import { IsDateString, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindReservationFilterDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({ examples: ['2022-03-01', '2022-03-01T18:00:00.000Z'] })
  startDate?: string;
  
  @IsOptional()
  @IsDateString()
  @ApiProperty({ examples: ['2022-03-01', '2022-03-01T18:00:00.000Z'] })
  endDate?: string;

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
