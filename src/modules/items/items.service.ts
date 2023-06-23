import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException('Room Not Found');
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
  async findAll(query: ExpressQuery): Promise<Object> {
    let limitPage = Number(query.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    let currentPage = Number(query.page)|| 1
    let skip = limitPage * (currentPage-1)

    const all_items = await this.itemModel.find({ deleted_at: null }).exec();
    const lastPage = Math.ceil(all_items.length / limitPage);


    const items = await this.itemModel
      .find({ deleted_at: null })
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
        throw new NotFoundException('Page Not Found');
      }
  
      interface CustomResponse {
        status: number;
        data: {
          currentPage: number;
          lastPage: number | null;
          data: Item[];
        };
      }
      
      const response: CustomResponse = {
        status: 200,
        data: {
          currentPage: currentPage,
          lastPage: lastPage,
          data: items,
        },
      };
      return response;
      
  }

  async findOne(id: string): Promise<Item> {
    const result = await this.itemModel
      .findOne({ _id: id,deleted_at: null})
      .populate({
        path: 'room',
        populate: {
          path: 'pavilion',
          model: 'Pavilion',
        },
      })
      .exec();
    if (!result) {
      throw new NotFoundException('Item Not Found');
    }
    return result;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const existingItem = await this.itemModel.findOne({ _id: id, deleted_at: null }).exec();
  
    if (!existingItem) {
      throw new NotFoundException('Item Not Found');
    }
  
    if (updateItemDto.room) {
      await this.checkRoomExists(updateItemDto.room);
    }
  
    existingItem.set(updateItemDto);
    await existingItem.save();
  
    return existingItem;
  }
  

  async remove(id: string): Promise<Item> {
    const deletedItem = await this.itemModel
      .findOneAndUpdate({ _id: id, deleted_at: null }, { deleted_at: new Date() })
      .exec();
  
    if (!deletedItem) {
      throw new NotFoundException('Item Not Found');
    }
  
    return deletedItem;
  }
  
}
