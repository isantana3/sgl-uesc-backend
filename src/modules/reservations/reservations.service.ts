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
import { Reservation, TDayWeek } from './schemas/reservation.schemas';
const dayWeekItens: TDayWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const convertReservation = (reservation: any) => {
  const dayString = reservation.day.toString();
  const dayFormatted = `${dayString.slice(0, 4)}-${dayString.slice(
    4,
    6,
  )}-${dayString.slice(6, 8)}`;
  const startHourString =
    reservation.startHour >= 1000
      ? reservation.startHour.toString()
      : '0' + reservation.startHour.toString();
  const startHourFormatted = `${startHourString.slice(
    0,
    2,
  )}:${startHourString.slice(2, 4)}:00`;
  const endHourString =
    reservation.endHour >= 1000
      ? reservation.endHour.toString()
      : '0' + reservation.endHour.toString();
  const endHourFormatted = `${endHourString.slice(0, 2)}:${endHourString.slice(
    2,
    4,
  )}:00`;
  const startDateString = `${dayFormatted}T${startHourFormatted}.000Z`;
  const startDate = new Date(startDateString);
  const endDateString = `${dayFormatted}T${endHourFormatted}.000Z`;
  const endDate = new Date(endDateString);

  return {
    ...reservation,
    startDate,
    endDate,
  };
};

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
    const { endHour, pavilion, startHour, day } = availableRoomsDto;
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
                day: day,
                endHour: {
                  $gte: new Date(startHour),
                  $lte: new Date(endHour),
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
  async checkReservation(checkReservationDto: any): Promise<Reservation[]> {
    const { day, room, startHour, endHour, semester, dayWeek } =
      checkReservationDto;
    console.log(day, room, startHour, endHour, semester, dayWeek);

    if (endHour === startHour) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'End Data equal to start date',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (endHour < startHour) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'End Data is less than start date',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    let querySemester = [];
    let queryDaily = [];
    if (semester) {
      querySemester = [
        {
          // - Se um registro semestral for feito com um registro diário criado nesse dia ou nos dias
          room,
          day: { $gt: semester.startDay, $lte: semester.endDay },
          dayWeek: semester.dayWeek,
          endHour: {
            $gt: startHour,
            $lte: endHour,
          },
          status: 'reserved',
        },
        {
          // - Se um registro semestral for feito nesse dia e horário
          room,
          endHour: {
            $gt: startHour,
            $lte: endHour,
          },
          'semester.startDay': {
            $lte: semester.endDay,
            $gte: semester.startDay,
          },
          'semester.endDay': {
            $lte: semester.endDay,
            $gte: semester.startDay,
          },
          'semester.dayWeek': semester.dayWeek,
          status: 'reserved',
        },
      ];
    }
    if (dayWeek) {
      queryDaily = [
        {
          // - Se um registro diário for feito no mesmo dia que outro diário
          room,
          day,
          dayWeek: dayWeek,
          endHour: {
            $gt: startHour,
            $lte: endHour,
          },
          status: 'reserved',
        },
        {
          // - Se um registro diário for feito no dia e horário de uma reserva semestral OK
          room,
          endHour: {
            $gt: startHour,
            $lte: endHour,
          },
          'semester.endDay': { $gte: day },
          'semester.startDay': { $lte: day },
          'semester.dayWeek': dayWeek,
          status: 'reserved',
        },
      ];
    }

    const reservations = await this.reservationModel.find({
      $or: [...queryDaily, ...querySemester],
    });

    return reservations;
  }

  async create(createReservationDto: any): Promise<Reservation> {
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
    const newReservation = new Reservation();
    const endDate = new Date(createReservationDto.endDate);
    const endHour = endDate.getUTCHours() * 100;
    const endMinute = endDate.getUTCMinutes();
    const endTime = endHour + endMinute;
    newReservation.endHour = endTime;

    const startDate = new Date(createReservationDto.startDate);
    const startHour = startDate.getUTCHours() * 100;
    const startMinute = startDate.getUTCMinutes();
    const startTime = startHour + startMinute;
    newReservation.startHour = startTime;

    const day = startDate.toISOString().split('T')[0];

    const dayNumber = parseInt(day.split('-').join(''));

    newReservation.dayWeek = dayWeekItens[startDate.getDay()];
    newReservation.day = dayNumber;

    Object.assign(newReservation, {
      room: createReservationDto.room,
      responsible: createReservationDto.responsible,
      label: createReservationDto.label,
      status: createReservationDto.status,
      previousObservation: createReservationDto.previousObservation,
      laterObservation: createReservationDto.laterObservation,
      semester: createReservationDto.semester,
    });
    console.log({
      day: dayNumber,
      startHour: startTime,
      endHour: endTime,
      room: createReservationDto.room,
      semester: createReservationDto.semester,
      dayWeek: newReservation.dayWeek,
    });

    const reservations = await this.checkReservation({
      day: dayNumber,
      startHour: startTime,
      endHour: endTime,
      room: createReservationDto.room,
      semester: createReservationDto.semester,
      dayWeek: newReservation.dayWeek,
    });
    console.log(reservations);

    if (reservations.length > 0) {
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          error: 'Room already reserved',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await this.reservationModel.create(newReservation);
  }

  async findAll(filterDto?: FindReservationFilterDto): Promise<any> {
    const query = this.reservationModel.find({
      semester: {
        $exists: false,
      },
    });

    if (filterDto.startHour) {
      query.where({ startHour: { $gte: filterDto.startHour } });
    }

    if (filterDto.endHour) {
      query.where({ endHour: { $lt: filterDto.endHour } });
    }

    if (filterDto.room) {
      query.where({ room: new mongo.ObjectId(filterDto.room) });
    }

    if (filterDto.responsible) {
      query.where({ responsible: new mongo.ObjectId(filterDto.responsible) });
    }

    if (filterDto.pavilion) {
      query.populate('responsible').populate({
        path: 'room',
        populate: {
          path: 'pavilion',
          model: 'Pavilion',
          match: { _id: filterDto.pavilion },
        },
      });
    } else {
      query.populate('responsible').populate({
        path: 'room',
        populate: {
          path: 'pavilion',
          model: 'Pavilion',
        },
      });
    }

    const secondaryQuery = query.clone();
    const all_reservations = await secondaryQuery.exec();

    let limitPage = Number(filterDto.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    const currentPage = Number(filterDto.page) || 1;
    const skip = limitPage * (currentPage - 1);

    const lastPage = Math.ceil(all_reservations.length / limitPage);

    query.limit(limitPage).skip(skip);

    const unfiltered_reservations = await query.exec();
    const reservations = unfiltered_reservations.filter(
      (reservation) => reservation.room && reservation.room.pavilion,
    );

    if (reservations.length == 0 && currentPage != 1) {
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
        currentPage: number;
        lastPage: number | null;
        data: Reservation[];
      };
    }
    const reservationsFormatted: any = reservations.map((reservation) => {
      return convertReservation(reservation.toJSON());
    });
    const response: CustomResponse = {
      status: 200,
      data: {
        currentPage: currentPage,
        lastPage: lastPage,
        data: reservationsFormatted,
      },
    };

    return response;
  }
  async findAllSemester(filterDto?: FindReservationFilterDto): Promise<any> {
    const query = this.reservationModel.find().where({
      semester: {
        $exists: true,
      },
    });

    if (filterDto.startHour) {
      query.where({ startHour: { $gte: filterDto.startHour } });
    }

    if (filterDto.endHour) {
      query.where({ endHour: { $lt: filterDto.endHour } });
    }

    if (filterDto.room) {
      query.where({ room: new mongo.ObjectId(filterDto.room) });
    }

    if (filterDto.responsible) {
      query.where({ responsible: new mongo.ObjectId(filterDto.responsible) });
    }

    if (filterDto.pavilion) {
      query.populate('responsible').populate({
        path: 'room',
        populate: {
          path: 'pavilion',
          model: 'Pavilion',
          match: { _id: filterDto.pavilion },
        },
      });
    } else {
      query.populate('responsible').populate({
        path: 'room',
        populate: {
          path: 'pavilion',
          model: 'Pavilion',
        },
      });
    }

    const secondaryQuery = query.clone();
    const all_reservations = await secondaryQuery.exec();

    let limitPage = Number(filterDto.limit) || 10;
    limitPage = limitPage > 100 ? 100 : limitPage;
    const currentPage = Number(filterDto.page) || 1;
    const skip = limitPage * (currentPage - 1);

    const lastPage = Math.ceil(all_reservations.length / limitPage);

    query.limit(limitPage).skip(skip);

    const unfiltered_reservations = await query.exec();
    const reservations = unfiltered_reservations.filter(
      (reservation) => reservation.room && reservation.room.pavilion,
    );

    if (reservations.length == 0 && currentPage != 1) {
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
        currentPage: number;
        lastPage: number | null;
        data: Reservation[];
      };
    }

    const response: CustomResponse = {
      status: 200,
      data: {
        currentPage: currentPage,
        lastPage: lastPage,
        data: reservations,
      },
    };
    return response;
  }
  async findOne(id: string): Promise<Reservation> {
    const result = await this.reservationModel
      .findOne({ _id: new mongo.ObjectId(id) })
      .populate('responsible')
      .populate({
        path: 'room',
        populate: {
          path: 'pavilion',
          model: 'Pavilion',
        },
      })
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
    // Remover o campo "password" de "responsible"
    const sanitizedResult = result.toJSON();
    if (sanitizedResult.responsible) {
      delete sanitizedResult.responsible.password;
    }

    return convertReservation(sanitizedResult);
  }
  async update(id: string, updateReservationDto: any): Promise<Reservation> {
    const newReservation = new Reservation();
    if (updateReservationDto.endDate) {
      const endDate = new Date(updateReservationDto.endDate);
      const endHour = endDate.getUTCHours() * 100;
      const endMinute = endDate.getUTCMinutes();
      const endTime = endHour + endMinute;
      newReservation.endHour = endTime;
    }
    if (updateReservationDto.startDate) {
      const startDate = new Date(updateReservationDto.startDate);
      const startHour = startDate.getUTCHours() * 100;
      const startMinute = startDate.getUTCMinutes();
      const startTime = startHour + startMinute;
      newReservation.startHour = startTime;
      const day = startDate.toISOString().split('T')[0];
      const dayNumber = parseInt(day.split('-').join(''));
      newReservation.dayWeek = dayWeekItens[startDate.getDay()];
      newReservation.day = dayNumber;
    }

    Object.assign(updateReservationDto, newReservation);

    await this.reservationModel
      .updateOne({ _id: new mongo.ObjectId(id) }, updateReservationDto)
      .exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<Reservation> {
    const deletedItem = await this.reservationModel
      .findByIdAndRemove({ _id: new mongo.ObjectId(id) })
      .exec();
    return deletedItem;
  }
}
