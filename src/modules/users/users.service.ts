import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schemas';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ObjectId } from 'mongoose';
import { hash } from 'bcrypt';
import { AuthenticationsService } from '../authentications/authentications.service';
import { MailService } from '../mail/mail.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => AuthenticationsService))
    private readonly authService: AuthenticationsService,
    private mail: MailService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByEmail(createUserDto.email, true);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = await hash(
      createUserDto.password || createUserDto.email + 'new-user',
      8,
    );
    if (!createUserDto.role) createUserDto.role = 'user';
    createUserDto.password = password;
    const newUser = await this.userModel.create({
      ...createUserDto,
      _id: new mongoose.Types.ObjectId(),
    });

    if (!newUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Signup failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.authService.createToken({
      user: newUser,
      type: 'email-verification',
    });

    await this.mail.sendMail({
      options: {
        to: createUserDto.email,
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

  async findAll(query: ExpressQuery): Promise<any> {
    let limitPage = Number(query.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    const currentPage = Number(query.page) || 1;
    const skip = limitPage * (currentPage - 1);

    const all_users = await this.userModel.find().exec();
    const lastPage = Math.ceil(all_users.length / limitPage);

    const users = await this.userModel
      .find()
      .limit(limitPage)
      .skip(skip)
      .exec();

    if (users.length == 0 && currentPage != 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Page Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    interface CustomResponse {
      status: number;
      data: {
        currentPage: number;
        lastPage: number | null;
        data: User[];
      };
    }

    const response: CustomResponse = {
      status: 200,
      data: {
        currentPage: currentPage,
        lastPage: lastPage,
        data: users,
      },
    };
    return response;
  }

  async findOne(id: string): Promise<User> {
    const _id = new mongoose.Types.ObjectId(id);

    const result = await this.userModel.findOne({ _id: _id }).exec();

    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result as any;
  }
  async findByEmail(
    email: string,
    withoutThrow?: boolean,
  ): Promise<User | undefined> {
    const result = await this.userModel.findOne({ email }).exec();
    if (!result && withoutThrow) {
      return undefined;
    }
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const _id = new mongoose.Types.ObjectId(id);
    await this.userModel.updateOne({ _id }, updateUserDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<User> {
    const deletedItem = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
