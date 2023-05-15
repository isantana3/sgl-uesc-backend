import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString({ message: 'label deve ser do tipo string' })
  @IsNotEmpty({ message: 'label é obrigatório' })
  @ApiProperty({
    example: 'Pavilhão de Ciências Exatas',
    examples: ['Pavilhão de Ciências Exatas', 'Pavilhão Jorge Amado'],
  })
  label: string;

  @IsOptional()
  @IsString({ message: 'description deve ser do tipo string' })
  @ApiProperty({
    example: 'Pavilhão de Ciências Exatas localizado próximo a torre da UESC',
    required: false,
  })
  description: string;

  @IsOptional()
  @IsString({ message: 'observation deve ser do tipo string' })
  @ApiProperty({ example: 'Pavilhão não possui elevador', required: false })
  observation: string;
}
