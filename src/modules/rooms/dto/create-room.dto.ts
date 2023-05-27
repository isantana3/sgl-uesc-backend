import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString({ message: 'label deve ser do tipo string' })
  @IsNotEmpty({ message: 'label é obrigatório' })
  @ApiProperty({
    example: 'Laboratório 20',
    examples: ['Laboratório 19', 'Sala 13', 'Auditório João Gomes'],
  })
  label: string;

  @IsString({ message: 'pavilion deve ser do tipo string' })
  @IsNotEmpty({ message: 'pavilion é obrigatório' })
  @ApiProperty({ example: '643d998881fdb61d5d0b1868' })
  pavilion: string;
}
