import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { MailService } from '../mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './schemas/tokens.entity';
import mongoose, { Model } from 'mongoose';
import { User } from '../users/schemas/user.schemas';
import time from '../../utils/time';
@Injectable()
export class AuthenticationsService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private jwtService: JwtService,
    private mail: MailService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  async createToken({
    user,
    type,
    expiresIn,
    withoutThrow,
  }: {
    user: User;
    type: string;
    expiresIn?: Date;
    withoutThrow?: boolean;
  }): Promise<Token | undefined> {
    // const type = 'email-verification';
    const token = await hash(`${user.email}-${type}`, 8);
    const isRevoked = false;
    const tokenExpiration =
      expiresIn || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    let newToken;
    const tokenObject = await this.tokenModel
      .findOne({
        userId: user._id,
        type,
      })
      .exec();

    if (!tokenObject) {
      newToken = await this.tokenModel.create({
        type,
        token,
        isRevoked,
        tokenExpiration,
        userId: user._id,
        _id: new mongoose.Types.ObjectId(),

      });
    } else {
      newToken = await this.tokenModel
        .updateOne(
          { userId: user._id, type },
          {
            isRevoked,
            token,
            tokenExpiration,
          },
        )
        .exec();
    }

    if (!newToken && withoutThrow) {
      return undefined;
    }
    if (!newToken) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Send Email failed',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return token;
  }
  async signUp(signUpDto: SignUpUserDto) {
    const user = await this.usersService.findByEmail(signUpDto.email, true);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.usersService.create(signUpDto);

    if (!newUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Signup failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.createToken({
      type: 'email-verification',
      user: newUser,
    });

    await this.mail.sendMail({
      options: {
        to: signUpDto.email,
        subject: 'Confirmação de E-mail',
      },
      template: {
        path: 'email-verification',
        params: {
          url: `${process.env.URL_EMAIL_CONFIRMATION}?token=${token}`,
        },
      },
    });
    return newUser;
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user.isActive) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email or password mismatch 1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email or password mismatch',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { sub: user._id.toString(), username: user.name };
    user.password = undefined;
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async activeAccount({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {

    const _token = await this.tokenModel.findOne({ token: token }).exec();

    if (!_token || _token.isRevoked || _token.type !== 'email-verification') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid Token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (time.isExpired(_token.tokenExpiration)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Expired Token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _user = await this.usersService.findOne(_token.userId.toString());
    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _password = await hash(password, 8);
    const newToken = await this.tokenModel
      .updateOne(
        { _id: _token._id },
        {
          isRevoked: true,
        },
      )
      .exec();

    if (!newToken) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Update token fails',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.update(_token.userId.toString(), {
      isActive: true,
      password: _password,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Update user fails',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'Account is active' };
  }
  async forgotPassword({ email }: { email: string }) {
    const user = await this.usersService.findByEmail(email);

    const token = await this.createToken({ user, type: 'reset-password' });
    await this.mail.sendMail({
      options: {
        to: user.email,
        subject: 'Recuperação de senha',
      },
      template: {
        path: 'forgot-password',
        params: {
          name: user.name,
          url: `${process.env.URL_EMAIL_CONFIRMATION}?token=${token}`,
        },
      },
    });
    return { message: 'E-mail sent' };
  }

  async rememberPassword({ token }: { token: string }) {
    const tokenObject = await this.tokenModel
      .findOne({
        token,
        type: 'reset-password',
        isRevoked: false,
      })
      .exec();
    if (!tokenObject) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (tokenObject.isRevoked) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Expired token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { message: 'Valid token' };
  }
  async resetPassword({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {
    const tokenObject = await this.tokenModel
      .findOne({
        token,
        type: 'reset-password',
      })
      .exec();
    if (!tokenObject) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (tokenObject.isRevoked) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Expired token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.findOne(tokenObject.userId.toString());
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _password = await hash(password, 8);

    user.password = _password;

    await this.usersService.update(user._id.toString(), user);

    return { message: 'Password updated' };
  }
}
