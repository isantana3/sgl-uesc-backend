import { ApiProperty } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends CreateUserDto {
  @ApiProperty({
    example: '6456eda63f9ebbed160ec2fb',
    description: 'Id do dado',
  })
  _id: string;

  @ApiProperty({
    example: '2023-05-15T00:57:46.762Z',
    description: 'Data de criação do dado',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-05-15T00:57:46.762Z',
    description: 'Data de atualização do dado',
  })
  updatedAt: Date;
}
