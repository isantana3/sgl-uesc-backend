import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePavilionDto } from './dto/create-pavilion.dto';
import { UpdatePavilionDto } from './dto/update-pavilion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pavilion } from './schemas/pavilion.schemas';
import { Model } from 'mongoose';

@Injectable()
export class PavilionsService {
  constructor(
    @InjectModel(Pavilion.name) private pavilionModel: Model<Pavilion>,
  ) {}
  async create(createPavilionDto: CreatePavilionDto): Promise<Pavilion> {
    return this.pavilionModel.create(createPavilionDto);
  }

  async findAll(): Promise<Pavilion[]> {
    return this.pavilionModel.find().exec();
  }

  async findOne(id: string): Promise<Pavilion> {
    const result = await this.pavilionModel.findOne({ _id: id }).exec();
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Pavilion Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async update(
    id: string,
    updatePavilionDto: UpdatePavilionDto,
  ): Promise<Pavilion> {
    await this.pavilionModel.updateOne({ _id: id }, updatePavilionDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<Pavilion> {
    const deletedItem = await this.pavilionModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
