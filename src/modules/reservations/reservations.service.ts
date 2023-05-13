import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/modules/users/users.service';
import { Reservation } from './schemas/reservation.schemas';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { FindReservationFilterDto } from './dto/find-reservations-filter-dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,

    private readonly usersService: UsersService,
  ) {}
  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const responsibleExists = await this.usersService.findOne(
      createReservationDto.responsible,
    );
    if (!responsibleExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.reservationModel.create(createReservationDto);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().populate('locationId').exec();
  }
  
  async findFilters(filterDto: FindReservationFilterDto): Promise<Reservation[]> {
    const query = this.reservationModel.find();
    const {startDate, endDate} = filterDto;

    if (startDate) {
      query.where({ startDate: { $gte: startDate } });
    }

    if (endDate) {
      query.where({ endDate: { $lt: endDate } });
    }

    query.populate('locationId');
    return query.exec();

  }

  async findOne(id: string): Promise<Reservation> {
    const result = await this.reservationModel
      .findOne({ _id: id })
      .populate('locationId')
      .exec();
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Reservation Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
  async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    await this.reservationModel.updateOne({ _id: id }, updateReservationDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<Reservation> {
    const deletedItem = await this.reservationModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}