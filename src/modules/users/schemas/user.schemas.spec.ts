import { User, UserDocument, TRole } from './user.schemas';
import { Types } from 'mongoose';

describe('User', () => {
  it('should be defined', () => {
    const user = new User();
    expect(user).toBeDefined();
  });

  it('should create a user with specified properties', () => {
    const id = new Types.ObjectId();
    const name = 'John Doe';
    const isActive = true;
    const email = 'johndoe@example.com';
    const password = 'password';
    const registration = '202020155';
    const office = 'professor';
    const role: TRole = 'user';

    const user = new User({
      _id: id,
      name,
      isActive,
      email,
      password,
      registration,
      office,
      role,
    });

    expect(user._id).toEqual(id);
    expect(user.name).toEqual(name);
    expect(user.isActive).toEqual(isActive);
    expect(user.email).toEqual(email);
    expect(user.password).toEqual(password);
    expect(user.registration).toEqual(registration);
    expect(user.office).toEqual(office);
    expect(user.role).toEqual(role);
  });
});

describe('UserDocument', () => {
  it('should have correct type', () => {
    const userDocument: UserDocument = {} as any;
    expect(userDocument).toBeDefined();
  });
});
