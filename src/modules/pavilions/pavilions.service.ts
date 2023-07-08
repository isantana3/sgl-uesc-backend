import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePavilionDto } from './dto/create-pavilion.dto';
import { UpdatePavilionDto } from './dto/update-pavilion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pavilion } from './schemas/pavilion.schemas';
import { Model } from 'mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class PavilionsService {
  constructor(
    @InjectModel(Pavilion.name) private pavilionModel: Model<Pavilion>,
  ) {}
  async create(createPavilionDto: CreatePavilionDto): Promise<Pavilion> {
    return this.pavilionModel.create(createPavilionDto);
  }

  async findAll(query: ExpressQuery): Promise<Object> {
    let limitPage = Number(query.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    let currentPage = Number(query.page)|| 1;
    let skip = limitPage * (currentPage-1);

    const all_pavilions = await this.pavilionModel.find({ deleted_at: null }).exec();
    const lastPage = Math.ceil(all_pavilions.length / limitPage);

    const pavilions = await this.pavilionModel.find({ deleted_at: null }).limit(limitPage).skip(skip).exec();

    if (pavilions.length == 0 && currentPage != 1){
       throw new NotFoundException('Page Not Found');
    }

    interface CustomResponse {
      status: number;
      data: {
        currentPage: number;
        lastPage: number | null;
        data: Pavilion[];
      };
    }
    
    const response: CustomResponse = {
      status: 200,
      data: {
        currentPage: currentPage,
        lastPage: lastPage,
        data: pavilions,
      },
    };
    return response;
  }

  async findOne(id: string): Promise<Pavilion> {
    const result = await this.pavilionModel.findOne({ _id: id, deleted_at: null }).exec();
    if (!result) {
      throw new NotFoundException('Pavilion Not Found');
    }
    return result;
  }

  async update(id: string, updatePavilionDto: UpdatePavilionDto,): Promise<Pavilion> {
    const existingPavilion = await this.pavilionModel.findOne({ _id: id, deleted_at: null }).exec();
  
    if (!existingPavilion) {
      throw new NotFoundException('Pavilion Not Found');
    }
  
    existingPavilion.set(updatePavilionDto);
    await existingPavilion.save();
  
    return existingPavilion;
  }

  async remove(id: string): Promise<Pavilion> {
    const deletedItem = await this.pavilionModel
      .findOneAndUpdate({ _id: id, deleted_at: null }, { deleted_at: new Date() })
      .exec();
  
    if (!deletedItem) {
      throw new NotFoundException('Pavilion Not Found');
    }
  
    return deletedItem;
  }
}
