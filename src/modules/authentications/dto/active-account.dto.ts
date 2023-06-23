import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ActiveAccountDto {
  @IsString({ message: 'token deve ser do tipo string' })
  @IsNotEmpty({ message: 'token é obrigatório' })
  @ApiProperty({
    example: '$2b$08$xsuShA3ctw0Zj.SU/8mGkOtmp3C4wOpp/La5j2vVhaneeo95uw8TK',
  })
  token: string;
}
