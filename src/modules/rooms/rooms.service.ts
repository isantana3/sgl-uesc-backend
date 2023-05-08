import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationsService } from 'src/modules/locations/locations.service';
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
    const locationExists = await this.locationServices.findOne(
      createRoomDto.locationId,
    );
    if (!locationExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Location Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.roomModel.create(createRoomDto);
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().populate('locationId').exec();
  }

  async findOne(id: string): Promise<Room> {
    const result = await this.roomModel
      .findOne({ _id: id })
      .populate('locationId')
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
