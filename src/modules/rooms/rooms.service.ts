import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PavilionsService } from 'src/modules/pavilions/pavilions.service';
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

  async findAll(query: ExpressQuery): Promise<Room[]> {
    let limitPage = Number(query.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    let currentPage = Number(query.page)|| 1
    let skip = limitPage * (currentPage-1)

    return this.roomModel.find().populate('pavilion').limit(limitPage).skip(skip).exec();
  }

  async findOne(id: string): Promise<Room> {
    const result = await this.roomModel
      .findOne({ _id: id })
      .populate('pavilion')
      .exec();
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Room Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.roomModel.updateOne({ _id: id }, updateRoomDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<Room> {
    const deletedItem = await this.roomModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
