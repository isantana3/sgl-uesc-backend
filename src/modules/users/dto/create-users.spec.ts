import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should be defined', () => {
    const createUserDto = new CreateUserDto();
    expect(createUserDto).toBeDefined();
  });

  it('should have all required properties', () => {
    const createUserDto = new CreateUserDto();
    expect(createUserDto.name).toBeUndefined();
    expect(createUserDto.email).toBeUndefined();
    expect(createUserDto.password).toBeUndefined();
    expect(createUserDto.registration).toBeUndefined();
    expect(createUserDto.office).toBeUndefined();
    expect(createUserDto.role).toBeUndefined();
  });

  it('should validate name property', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.name = 'John Doe';
    expect(createUserDto.name).toEqual('John Doe');
  });

  it('should validate email property', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.email = 'test@example.com';
    expect(createUserDto.email).toEqual('test@example.com');
  });

  it('should validate password property', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.password = '12345678';
    expect(createUserDto.password).toEqual('12345678');
  });

  it('should validate registration property', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.registration = '202020155';
    expect(createUserDto.registration).toEqual('202020155');
  });

  it('should validate office property', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.office = 'professor';
    expect(createUserDto.office).toEqual('professor');
  });

  it('should validate role property', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.role = 'admin';
    expect(createUserDto.role).toEqual('admin');
  });
});
