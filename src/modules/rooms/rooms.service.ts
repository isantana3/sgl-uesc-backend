import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PavilionsService } from '../pavilions/pavilions.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schemas/room.schemas';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,

    private readonly pavilionServices: PavilionsService,
  ) {}
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const pavilionExists = await this.pavilionServices.findOne(
      createRoomDto.pavilion,
    );
    if (!pavilionExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Location Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newData = await this.roomModel.create(createRoomDto);
    if (!newData) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro interno',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data = await this.findOne(newData.id);

    return data;
  }

  async findAll(query: ExpressQuery): Promise<Object> {
    let limitPage = Number(query.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    let currentPage = Number(query.page)|| 1;
    let skip = limitPage * (currentPage-1);

    const all_rooms =  await this.roomModel.find({ deleted_at: null }).populate('pavilion');
    const lastPage = Math.ceil(all_rooms.length / limitPage);

    const rooms = await this.roomModel.find({ deleted_at: null }).populate('pavilion').limit(limitPage).skip(skip).exec();
    if (rooms.length == 0 && currentPage != 1){
      throw new NotFoundException('Page Not Found');
    }

    interface CustomResponse {
      status: number;
      data: {
        currentPage: number;
        lastPage: number | null;
        data: Room[];
      };
    }
    
    const response: CustomResponse = {
      status: 200,
      data: {
        currentPage: currentPage,
        lastPage: lastPage,
        data: rooms,
      },
    };
    return response;
    

  }

  async findOne(id: string): Promise<Room> {
    const result = await this.roomModel
      .findOne({ _id: id,  deleted_at: null })
      .populate('pavilion')
      .exec();
    if (!result) {
      throw new NotFoundException('Room Not Found');
    }
    return result;
  }
  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const existingItem = await this.roomModel.findOne({ _id: id, deleted_at: null }).exec();
    
    if (!existingItem) {
      throw new NotFoundException('Room Not Found');
    }
    
    existingItem.set(updateRoomDto);
    await existingItem.save();
    
    return this.findOne(id);
  }

  async remove(id: string): Promise<Room> {
    const deletedItem = await this.roomModel
      .findOneAndUpdate({ _id: id, deleted_at: null }, { deleted_at: new Date() })
      .exec();
  
    if (!deletedItem) {
      throw new NotFoundException('Room Not Found');
    }
  
    return deletedItem;
  }
}
