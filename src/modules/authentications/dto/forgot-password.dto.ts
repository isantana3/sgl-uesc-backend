import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsString({ message: 'email deve ser do tipo string' })
  @IsNotEmpty({ message: 'email é obrigatório' })
  @ApiProperty({
    example: 'email@uesc.br',
  })
  email: string;
}
