import { IsDate, IsOptional } from 'class-validator';

export class FindReservationFilterDto {
    @IsOptional()
    @IsDate()
    startDate?: string;
  
    @IsOptional()
    @IsDate()
    endDate?: string;
}