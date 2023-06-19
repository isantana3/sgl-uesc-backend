import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { TRole } from '../schemas/user.schemas';

export class CreateUserDto {
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

  @IsString({ message: 'password deve ser do tipo string' })
  @MinLength(8)
  @IsNotEmpty({ message: 'password é obrigatório' })
  @ApiProperty({ example: '12345678' })
  @Exclude({ toPlainOnly: true })
  password: string;

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

  @IsString({ message: 'role deve ser do tipo string' })
  @IsNotEmpty({ message: 'role é obrigatório' })
  @ApiProperty({
    example: 'admin',
    examples: ['admin', 'manager', 'user'],
  })
  @IsEnum(['admin', 'manager', 'user'])
  role: TRole;

  isActive?: boolean;
}
