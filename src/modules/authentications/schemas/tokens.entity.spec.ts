import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Token, TokenDocument, TokenSchema } from './tokens.entity';
import { User } from '../../users/schemas/user.schemas';
import mongoose, { Model } from 'mongoose';

describe('Token', () => {
  let tokenModel: Model<TokenDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Token.name),
          useValue: mongoose.model(Token.name, TokenSchema),
        },
      ],
    }).compile();

    tokenModel = module.get<Model<TokenDocument>>(getModelToken(Token.name));
  });

  it('should be defined', () => {
    const token = new Token();
    expect(token).toBeDefined();
    expect(token).toBeInstanceOf(Token);
  });

  it('should have correct properties', () => {
    const userId = new User();
    const tokenString = 'token123';
    const isRevoked = false;
    const type = 'access';
    const tokenExpiration = new Date();

    const token = new Token();
    token.userId = userId
    token.token = tokenString
    token.isRevoked = isRevoked
    token.type = type
    token.tokenExpiration = tokenExpiration

    expect(token.userId).toEqual(userId);
    expect(token.token).toEqual(tokenString);
    expect(token.isRevoked).toEqual(isRevoked);
    expect(token.type).toEqual(type);
    expect(token.tokenExpiration).toEqual(tokenExpiration);
  });

  it('should have correct mongoose schema', () => {
    const schema = tokenModel.schema;

    expect(schema.path('_id')).toBeDefined();
    expect(schema.path('userId')).toBeDefined();
    expect(schema.path('token')).toBeDefined();
    expect(schema.path('isRevoked')).toBeDefined();
    expect(schema.path('type')).toBeDefined();
    expect(schema.path('tokenExpiration')).toBeDefined();
  });
});
