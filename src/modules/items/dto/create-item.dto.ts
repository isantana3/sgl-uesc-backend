import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateItemDto {
  @IsString({ message: 'label deve ser do tipo string' })
  @IsNotEmpty({ message: 'label é obrigatório' })
  @ApiProperty({
    example: 'Cadeira',
    examples: ['Cadeira', 'Mesa', 'Monitor'],
  })
  label: string;

  @IsString({ message: 'code deve ser do tipo string' })
  @Length(5, 30, {
    message: 'O código deve ter no mínimo 5 e no máximo 30 caracteres',
  })
  @IsNotEmpty({ message: 'code é obrigatório' })
  @ApiProperty({
    example: 'AD28SD98',
    examples: ['000001', '000002', 'AD2231A'],
  })
  code: string;

  @IsString({ message: 'room deve ser do tipo string' })
  @IsNotEmpty({ message: 'room é obrigatório' })
  @ApiProperty({
    example: '643d998881fdb61d5d0b1868',
  })
  room: string;

  @IsOptional()
  @IsString({ message: 'description deve ser do tipo string' })
  @ApiProperty({ example: 'Item cor vermelho', required: false })
  description: string;

  @IsOptional()
  @IsString({ message: 'observation deve ser do tipo string' })
  @ApiProperty({ example: 'Item possui avarias', required: false })
  observation: string;
}
