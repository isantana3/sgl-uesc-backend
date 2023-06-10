import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schemas/item.schemas';
import { Model } from 'mongoose';
import { RoomsService } from '../rooms/rooms.service';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>,

    private readonly roomsServices: RoomsService,
  ) {}
  private async checkRoomExists(room) {
    const roomExists = await this.roomsServices.findOne(room);

    if (!roomExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Room Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async create(createItemDto: CreateItemDto) {
    await this.checkRoomExists(createItemDto.room);

    const newData = await this.itemModel.create(createItemDto);

    if (!newData) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const result = await this.findOne(newData.id);
    return result;
  }
  async findAll(query: ExpressQuery, url: string): Promise<Object> {
    let limitPage = Number(query.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    let currentPage = Number(query.page)|| 1
    let skip = limitPage * (currentPage-1)

    const all_items = await this.itemModel.find().exec();

    const lastPage = Math.ceil(all_items.length / limitPage);
    const previousPage = (currentPage - 1) > 0 ? (currentPage - 1) : null;
    const nextPage= (currentPage + 1) <= lastPage ? (currentPage + 1) : null;


    const items = await this.itemModel
      .find()
      .populate({
        path: 'room',
        populate: {
          path: 'pavilion',
          model: 'Pavilion',
        },
      })
      .limit(limitPage)
      .skip(skip)
      .exec();

      if (items.length == 0 && currentPage != 1){
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
          currentPage: string;
          previousPage: string | null;
          nextPage: string | null;
          lastPage: string | null;
          data: Item[];
        };
      }
      
      const response: CustomResponse = {
        status: 200,
        data: {
          currentPage: currentPage == null? null: url.replace(/(page=)\d+/, `$1${currentPage}`),
          previousPage: previousPage == null? null: url.replace(/(page=)\d+/, `$1${previousPage}`),
          nextPage: nextPage == null? null: url.replace(/(page=)\d+/, `$1${nextPage}`),
          lastPage: lastPage == null? null: url.replace(/(page=)\d+/, `$1${lastPage}`),
          data: items,
        },
      };
      return response;
      
  }

  async findOne(id: string): Promise<Item> {
    const result = await this.itemModel
      .findOne({ _id: id })
      .populate({
        path: 'room',
        populate: {
          path: 'pavilion',
          model: 'Pavilion',
        },
      })
      .exec();
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Item Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async update(id: string, updateRoomDto: UpdateItemDto): Promise<Item> {
    if (updateRoomDto.room) {
      await this.checkRoomExists(updateRoomDto.room);
    }

    await this.itemModel.updateOne({ _id: id }, updateRoomDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<Item> {
    const deletedItem = await this.itemModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
