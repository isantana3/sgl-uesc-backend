import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordDto } from './forgot-password.dto';
import { validateSync } from 'class-validator';

describe('ForgotPasswordDto', () => {
  let dto: ForgotPasswordDto;

  beforeEach(() => {
    dto = new ForgotPasswordDto();
  });

  it('should be defined', () => {
    expect(dto).toBeDefined();
  });

  it('should have the correct properties', () => {
    expect(dto.email).toBeUndefined();
  });

  it('should validate the "email" property', () => {
    dto.email = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(1);

    dto.email = 'email@uesc.br';
    errors = validateSync(dto);
    expect(errors.length).toEqual(0);
  });
});
