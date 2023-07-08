import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserDto } from './login-user.dto';
import { validateSync } from 'class-validator';

describe('LoginUserDto', () => {
  let dto: LoginUserDto;

  beforeEach(() => {
    dto = new LoginUserDto();
  });

  it('should be defined', () => {
    expect(dto).toBeDefined();
  });

  it('should have the correct properties', () => {
    expect(dto.email).toBeUndefined();
    expect(dto.password).toBeUndefined();
  });

  it('should validate the "email" property', () => {
    dto.email = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(2);

    dto.email = 'fulano@uesc.br';
    errors = validateSync(dto);
    expect(errors.length).toEqual(1);
  });

  it('should validate the "password" property', () => {
    dto.password = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(2);

    dto.password = '12345678';
    errors = validateSync(dto);
    expect(errors.length).toEqual(1);
  });
  
  it('should validate the "email" and "password" property', () => {
    dto.email = 'fulano@uesc.br';
    dto.password = '12345678';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(0);
  });
});
