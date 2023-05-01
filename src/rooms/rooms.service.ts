import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schemas/room.schemas';
import { Model } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const result = await this.roomModel.create(createRoomDto);

    return result;
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel.findOne({ _id: id }).exec();
  }
  async update(id: string, updateRoomDto: UpdateRoomDto) {
    await this.roomModel.updateOne({ _id: id }, updateRoomDto).exec();

    return this.findOne(id);
  }

  async remove(id: string) {
    const deletedCat = await this.roomModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
