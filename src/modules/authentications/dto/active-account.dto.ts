import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ActiveAccountDto {
  @IsString({ message: 'token deve ser do tipo string' })
  @IsNotEmpty({ message: 'token é obrigatório' })
  @ApiProperty({
    example: '$2b$08$xsuShA3ctw0Zj.SU/8mGkOtmp3C4wOpp/La5j2vVhaneeo95uw8TK',
  })
  token: string;

  @IsString({ message: 'password deve ser do tipo string' })
  @MinLength(8)
  @IsNotEmpty({ message: 'password é obrigatório' })
  @ApiProperty({ example: '12345678' })
  @Exclude({ toPlainOnly: true })
  password?: string;
}
