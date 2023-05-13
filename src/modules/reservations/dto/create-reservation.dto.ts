import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator';

export class CreateReservationDto {
    @IsString({ message: 'O título deve ser do tipo string' })
    @IsNotEmpty({ message: 'O título é obrigatório' })
    @ApiProperty({
      example: 'Reserva Lab 20',
      examples: ['Reserva Laboratório 19', 'Reserva Sala 13', 'Reserva Auditório João Gomes'],
    })
    label: string;
    
    @IsString({ message: 'A observação prévia deve ser do tipo string' })
    @IsNotEmpty({ message: 'A observação prévia é obrigatório' })
    @ApiProperty({
      example: 'Ventilador não estava funcionando',
      examples: ['Ventilador não estava funcionando', 'Sem datashow', 'Arcondicionado quebrado'],
    })
    previousObservation: string;
    
    @IsString({ message: 'A observação posterior deve ser do tipo string' })
    @ApiProperty({
      example: 'Ventilador parou de funcionar',
      examples: ['Ventilador parou de funcionar', 'Datashow quebrou', 'Arcondicionado não está desligando'],
    })
    laterObservation: string;
  
    @IsString({ message: 'responsibleId deve ser do tipo number' })
    @IsNotEmpty({ message: 'responsibleId é obrigatório' })
    @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
    responsible: number;

    @IsNotEmpty({ message: 'A data de início é obrigatória' })
    @IsDate({ message: 'A data de início deve ser uma data válida' })
    @ApiProperty({
        example: '2023-06-15T10:00:00.000Z',
        description: 'Data e hora de início da reserva no formato ISO 8601',
      })
    startDate: Date;

    @IsNotEmpty({ message: 'A data de término é obrigatória' })
    @IsDate({ message: 'A data de término deve ser uma data válida' })
    @ApiProperty({
        example: '2023-06-15T12:00:00.000Z',
        description: 'Data e hora de término da reserva no formato ISO 8601',
    })
    endDate: Date;
    
    @IsNotEmpty({ message: 'O status é obrigatório' })
    @IsBoolean({ message: 'O status deve ser do tipo booleano' })
    @ApiProperty({
        example: true,
        description: 'Indica se a reserva foi confirmada ou não',
    })
    status: boolean;
}
