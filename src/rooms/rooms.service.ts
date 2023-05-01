import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationsService } from 'src/locations/locations.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schemas/room.schemas';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,

    private readonly locationServices: LocationsService,
  ) {}
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    await this.locationServices.findOne(createRoomDto.locationId);

    return await this.roomModel.create(createRoomDto);
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel.findOne({ _id: id }).exec();
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
