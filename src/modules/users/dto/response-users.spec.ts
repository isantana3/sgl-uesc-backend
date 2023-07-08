import { ResponseUserDto } from './response-user.dto';
import { CreateUserDto } from './create-user.dto';

describe('ResponseUserDto', () => {
  it('should be defined', () => {
    const responseUserDto = new ResponseUserDto();
    expect(responseUserDto).toBeDefined();
  });

  it('should extend CreateUserDto', () => {
    const responseUserDto = new ResponseUserDto();
    expect(responseUserDto instanceof CreateUserDto).toBe(true);
  });

  it('should have all properties', () => {
    const responseUserDto = new ResponseUserDto();
    expect(responseUserDto._id).toBeUndefined();
    expect(responseUserDto.createdAt).toBeUndefined();
    expect(responseUserDto.updatedAt).toBeUndefined();
  });

  it('should validate _id property', () => {
    const responseUserDto = new ResponseUserDto();
    responseUserDto._id = '6456eda63f9ebbed160ec2fb';
    expect(responseUserDto._id).toEqual('6456eda63f9ebbed160ec2fb');
  });

  it('should validate createdAt property', () => {
    const responseUserDto = new ResponseUserDto();
    responseUserDto.createdAt = new Date('2023-05-15T00:57:46.762Z');
    expect(responseUserDto.createdAt).toEqual(new Date('2023-05-15T00:57:46.762Z'));
  });

  it('should validate updatedAt property', () => {
    const responseUserDto = new ResponseUserDto();
    responseUserDto.updatedAt = new Date('2023-05-15T00:57:46.762Z');
    expect(responseUserDto.updatedAt).toEqual(new Date('2023-05-15T00:57:46.762Z'));
  });
});
