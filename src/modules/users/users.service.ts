import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(query: ExpressQuery): Promise<Object> {
    let limitPage = Number(query.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    let currentPage = Number(query.page)|| 1
    let skip = limitPage * (currentPage-1)

    const all_users = await this.userModel.find({ deleted_at: null }).exec()
    const lastPage = Math.ceil(all_users.length / limitPage);


    const users = await this.userModel.find({ deleted_at: null }).limit(limitPage).skip(skip).exec();

    if (users.length == 0 && currentPage != 1){
      throw new NotFoundException('Page Not Found');
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
        currentPage: currentPage ,
        lastPage: lastPage ,
        data: users,
      },
    };
    return response;

  }

  async findOne(id: string): Promise<User> {
    const result = await this.userModel.findOne({ _id: id, deleted_at: null }).exec();
    if (!result) {
      throw new NotFoundException('User Not Found');
    }
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userModel.updateOne({ _id: id }, updateUserDto).exec();
    const existingItem = await this.userModel.findOne({ _id: id, deleted_at: null }).exec();
  
    if (!existingItem) {
      throw new NotFoundException('User Not Found');
    }
  
    existingItem.set(updateUserDto);
    await existingItem.save();
  
    return this.findOne(id);
  }

  async remove(id: string): Promise<User> {
    const deletedItem = await this.userModel
      .findOneAndUpdate({ _id: id, deleted_at: null }, { deleted_at: new Date() })
      .exec();
  
    if (!deletedItem) {
      throw new NotFoundException('User Not Found');
    }
  
    return deletedItem;
  }
}
