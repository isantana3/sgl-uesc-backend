import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class FindReservationFilterDto {
  @IsOptional()
  @IsDate()
  startDate?: string;

  @IsOptional()
  @IsDate()
  endDate?: string;
  
  @IsOptional()
  @IsNumber()
  limit?: string;

  @IsOptional()
  @IsNumber()
  page?: string;
}

// let limitPage = Number(query.limit) || 10;
// limitPage = limitPage > 100 ? 100 : limitPage;
// let currentPage = Number(query.page)|| 1
// let skip = limitPage * (currentPage-1)