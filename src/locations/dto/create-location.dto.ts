import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsString({ message: 'label deve ser do tipo string' })
  @IsNotEmpty({ message: 'label é obrigatório' })
  @ApiProperty({
    example: 'Pavilhão de Ciências Exatas',
    examples: ['Pavilhão de Ciências Exatas', 'Pavilhão Jorge Amado'],
  })
  label: string;

  @ApiProperty({
    example: 'Pavilhão de Ciências Exatas localizado próximo a torre da UESC',
  })
  description: string;

  @ApiProperty({ example: 'Pavilhão não possui elevador' })
  observation: string;
}
