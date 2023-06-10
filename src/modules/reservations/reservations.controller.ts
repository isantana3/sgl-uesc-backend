import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Req,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { FindReservationFilterDto } from './dto/find-reservations-filter-dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';
import { ResponseReservationDto } from './dto/response-reservation.dto';
import { ResponseRoomDto } from '../rooms/dto/response-room.dto';
import { AvailableRoomsDto } from './dto/available-rooms.dto';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('Reservas - Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  // Criação de reserva
  // Atualização
  // Visualização de todas as salas reservadas
  // - Por localização (pavilhão)
  // - # Por sala
  // - # Por dia, mostrar todas as salas disponíveis naquele dia
  // - # Por dia e hora, mostrar todas as salas disponíveis naquele horário
  // - # Admin -> Visualizar reservar por usuário
  // Visualização de uma reserva
  // Cancelar reserva
  // - Só administrador e usuário que reservou pode reservar sala
  // Verificar se possui reserva de uma sala em uma data específica

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Dado criado com sucesso',
    type: ResponseReservationDto,
  })
  create(@Body() createReservationDto: CreateReservationDto) {
    const {
      endDate,
      label,
      laterObservation,
      previousObservation,
      responsible,
      room,
      startDate,
      status,
    } = createReservationDto;
    return this.reservationsService.create({
      endDate,
      label,
      laterObservation,
      previousObservation,
      responsible,
      room,
      startDate,
      status,
    });
  }
  @Get('/available-rooms')
  @ApiResponse({
    status: 200,
    description: 'Dados listados com sucesso',

    type: ResponseRoomDto,
  })
  getAvailableRoom(@Query() availableRoomsDto: AvailableRoomsDto) {
    return this.reservationsService.getAvailableRoom(availableRoomsDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Dados listados com sucesso',
    isArray: true,
    type: ResponseReservationDto,
  })
  findAll(@Query() filterDto: FindReservationFilterDto, @Req() request: Request) {
    const url = request.protocol + '://' + request.get('host') + request.originalUrl;
    return this.reservationsService.findAll(url, filterDto);
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Visualização de dado realizada com sucesso',
    isArray: true,
    type: ResponseReservationDto,
  })
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Atualização de dado realizada com sucesso',
    type: ResponseReservationDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    const {
      endDate,
      label,
      laterObservation,
      previousObservation,
      responsible,
      room,
      startDate,
      status,
    } = updateReservationDto;
    return this.reservationsService.update(id, {
      endDate,
      label,
      laterObservation,
      previousObservation,
      responsible,
      room,
      startDate,
      status,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleção de dado realizada com sucesso',
    type: ResponseReservationDto,
  })
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
