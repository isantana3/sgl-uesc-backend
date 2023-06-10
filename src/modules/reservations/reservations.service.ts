import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { UsersService } from 'src/modules/users/users.service';
import { RoomsService } from '../rooms/rooms.service';
import { Room } from '../rooms/schemas/room.schemas';
import { AvailableRoomsDto } from './dto/available-rooms.dto';
import { CheckReservationDto } from './dto/check-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { FindReservationFilterDto } from './dto/find-reservations-filter-dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './schemas/reservation.schemas';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    @InjectModel(Room.name) private roomModel: Model<Room>,

    private readonly usersService: UsersService,
    private readonly roomsService: RoomsService,
  ) {}
  // Retorna as reversas da sala em um período de tempo
  async getAvailableRoom(
    availableRoomsDto: AvailableRoomsDto,
  ): Promise<Reservation[]> {
    const { endDate, pavilion, startDate } = availableRoomsDto;
    const data: any = [];
    if (pavilion) {
      data.push({
        $match: {
          pavilion: new mongo.ObjectId(pavilion),
        },
      });
    }
    const reservations = await this.roomModel.aggregate([
      {
        // Busca usuários que bate com o userId em messages
        $lookup: {
          from: 'reservations',
          let: { roomId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$room', '$$roomId'] },
                endDate: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate),
                },
              },
            },
          ],
          as: 'reservations',
        },
      },
      ...data,
    ]);

    return reservations;
  }
  // Retorna as reversas da sala em um período de tempo
  async checkReservation(
    checkReservationDto: CheckReservationDto,
  ): Promise<Reservation[]> {
    const { endDate, room, startDate } = checkReservationDto;
    if (endDate === startDate) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'End Data equal to start date',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const reservations = await this.reservationModel.find({
      room,
      endDate: {
        $gt: startDate,
        $lte: endDate,
      },
    });

    return reservations;
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    await this.roomsService.findOne(createReservationDto.room);
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
    const reservations = await this.checkReservation({
      endDate: createReservationDto.endDate,
      room: createReservationDto.room,
      startDate: createReservationDto.startDate,
    });

    if (reservations.length > 0) {
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          error: 'Room already reserved',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await this.reservationModel.create(createReservationDto);
  }

  async findAll(url: string, filterDto?: FindReservationFilterDto): Promise<Object> {
    const query = this.reservationModel.find();

    if (filterDto.startDate) {
      query.where({ startDate: { $gte: filterDto.startDate } });
    }

    if (filterDto.endDate) {
      query.where({ endDate: { $lt: filterDto.endDate } });
    }
    
    if (filterDto.room) {
      query.where({ room: filterDto.room });
    }
    
    if (filterDto.responsible) {
      query.where({ responsible: filterDto.responsible });
    }

    query.populate('responsible').populate({
      path: 'room',
      populate: {
        path: 'pavilion',
        model: 'Pavilion',
      },
    });

    const secondaryQuery = query.clone();
    const all_reservations = await secondaryQuery.exec()

    let limitPage = Number(filterDto.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    let currentPage = Number(filterDto.page)|| 1
    let skip = limitPage * (currentPage-1)
    
    const lastPage = Math.ceil(all_reservations.length / limitPage);
    const previousPage = (currentPage - 1) > 0 ? (currentPage - 1) : null;
    const nextPage= (currentPage + 1) <= lastPage ? (currentPage + 1) : null;

    query.limit(limitPage).skip(skip)

    const reservations = await query.exec();

    if (reservations.length == 0 && currentPage != 1){
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
        data: Reservation[];
      };
    }
    
    const response: CustomResponse = {
      status: 200,
      data: {
        currentPage: currentPage == null? null: url.replace(/(page=)\d+/, `$1${currentPage}`),
        previousPage: previousPage == null? null: url.replace(/(page=)\d+/, `$1${previousPage}`),
        nextPage: nextPage == null? null: url.replace(/(page=)\d+/, `$1${nextPage}`),
        lastPage: lastPage == null? null: url.replace(/(page=)\d+/, `$1${lastPage}`),
        data: reservations,
      },
    };
    return response;
  }

  async findOne(id: string): Promise<Reservation> {
    const result = await this.reservationModel
      .findOne({ _id: id })
      .populate('responsible')
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
  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    await this.reservationModel
      .updateOne({ _id: id }, updateReservationDto)
      .exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<Reservation> {
    const deletedItem = await this.reservationModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
