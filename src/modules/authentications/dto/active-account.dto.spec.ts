import { Test, TestingModule } from '@nestjs/testing';
import { ActiveAccountDto } from './active-account.dto';
import { validateSync } from 'class-validator';

describe('ActiveAccountDto', () => {
  let dto: ActiveAccountDto;

  beforeEach(() => {
    dto = new ActiveAccountDto();
  });

  it('should be defined', () => {
    expect(dto).toBeDefined();
  });

  it('should have the correct properties', () => {
    expect(dto.token).toBeUndefined();
    expect(dto.password).toBeUndefined();
  });

  it('should validate the "token" property', () => {
    dto.token = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(2);

    dto.token = '123';
    errors = validateSync(dto);
    expect(errors.length).toEqual(1);
  });

  it('should validate the "password" property', () => {
    dto.password = '';
    let errors = validateSync(dto);
    expect(errors.length).toEqual(2);

    dto.password = '123';
    errors = validateSync(dto);
    expect(errors.length).toEqual(2);

    dto.password = '12345678';
    errors = validateSync(dto);
    expect(errors.length).toEqual(1);
  });
});
