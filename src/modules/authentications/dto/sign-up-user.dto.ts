import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
  @IsString({ message: 'name deve ser do tipo string' })
  @IsNotEmpty({ message: 'name é obrigatório' })
  @ApiProperty({
    example: 'Roberto Carlos',
    examples: ['Luana Silva', 'Pablo Monitor'],
  })
  name: string;

  @IsEmail({}, { message: 'email deve ser do tipo email' })
  @IsNotEmpty({ message: 'email é obrigatório' })
  @ApiProperty({
    example: 'email@uesc.br',
  })
  email: string;

  @IsNotEmpty({ message: 'registration é obrigatório' })
  @ApiProperty({
    example: '202020155',
    examples: ['12345', '542584', 'A5SC2018'],
  })
  registration: string;

  @IsString({ message: 'office deve ser do tipo string' })
  @IsNotEmpty({ message: 'office é obrigatório' })
  @ApiProperty({
    example: 'professor',
    examples: ['professor', 'student', 'technician'],
  })
  office: string;
}
