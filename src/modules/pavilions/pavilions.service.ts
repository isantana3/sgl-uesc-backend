import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findAll(query: ExpressQuery, url: string): Promise<Object> {
    let limitPage = Number(query.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    let currentPage = Number(query.page)|| 1;
    let skip = limitPage * (currentPage-1);

    const all_pavilions = await this.pavilionModel.find().exec();

    const lastPage = Math.ceil(all_pavilions.length / limitPage);
    const previousPage = (currentPage - 1) > 0 ? (currentPage - 1) : null;
    const nextPage= (currentPage + 1) <= lastPage ? (currentPage + 1) : null;

    const pavilions = await this.pavilionModel.find().limit(limitPage).skip(skip).exec();

    if (pavilions.length == 0 && currentPage != 1){
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
        data: Pavilion[];
      };
    }
    
    const response: CustomResponse = {
      status: 200,
      data: {
        currentPage: currentPage == null? null: url.replace(/(page=)\d+/, `$1${currentPage}`),
        previousPage: previousPage == null? null: url.replace(/(page=)\d+/, `$1${previousPage}`),
        nextPage: nextPage == null? null: url.replace(/(page=)\d+/, `$1${nextPage}`),
        lastPage: lastPage == null? null: url.replace(/(page=)\d+/, `$1${lastPage}`),
        data: pavilions,
      },
    };
    return response;
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
