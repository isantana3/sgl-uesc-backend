import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'email deve ser do tipo string' })
  @IsNotEmpty({ message: 'email é obrigatório' })
  @ApiProperty({
    example: 'fulano@uesc.br',
  })
  email: string;

  @IsString({ message: 'password deve ser do tipo string' })
  @IsNotEmpty({ message: 'password é obrigatório' })
  @ApiProperty({
    example: '12345678',
  })
  password: string;
}
