import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUserDto } from './sign-up-user.dto';
import { validateSync } from 'class-validator';

describe('SignUpUserDto', () => {
  let dto: SignUpUserDto;

  beforeEach(() => {
    dto = new SignUpUserDto();
  });

  it('should be defined', () => {
    expect(dto).toBeDefined();
  });

  it('should have the correct properties', () => {
    expect(dto.name).toBeUndefined();
    expect(dto.email).toBeUndefined();
    expect(dto.registration).toBeUndefined();
    expect(dto.office).toBeUndefined();
  });

  it('should validate the "name" property', () => {
    dto.name = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(4);

    dto.name = 'Roberto Carlos';
    errors = validateSync(dto);
    expect(errors.length).toEqual(3);
  });

  it('should validate the "email" property', () => {
    dto.email = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(4);

    dto.email = 'email@uesc.br';
    errors = validateSync(dto);
    expect(errors.length).toEqual(3);
  });

  it('should validate the "registration" property', () => {
    dto.registration = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(4);

    dto.registration = '202020155';
    errors = validateSync(dto);
    expect(errors.length).toEqual(3);
  });

  it('should validate the "office" property', () => {
    dto.office = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(4);

    dto.office = 'professor';
    errors = validateSync(dto);
    expect(errors.length).toEqual(3);
  });
});
