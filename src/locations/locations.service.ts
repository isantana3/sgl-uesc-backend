import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './entities/location.schemas';
import { Model } from 'mongoose';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationModel.create(createLocationDto);
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findOne(id: string): Promise<Location> {
    const result = await this.locationModel.findOne({ _id: id }).exec();
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Location Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    await this.locationModel.updateOne({ _id: id }, updateLocationDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<Location> {
    const deletedItem = await this.locationModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
