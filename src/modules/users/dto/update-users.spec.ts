import { UpdateUserDto } from './update-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

describe('UpdateUserDto', () => {
  it('should be defined', () => {
    const updateUserDto = new UpdateUserDto();
    expect(updateUserDto).toBeDefined();
  });
  
});
