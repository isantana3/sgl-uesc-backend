import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  // Criação de reserva
  // Atualização
  // Visualização de todas as salas reservadas
  // - Por localização (pavilhão)
  // - Por sala
  // - Por dia, mostrar todas as salas disponíveis naquele dia
  // - Por dia e hora, mostrar todas as salas disponíveis naquele horário
  // - Admin -> Visualizar reservar por usuário
  // Visualização de uma reserva
  // Cancelar reserva
  // - Só administrador e usuário que reservou pode reservar sala
  // Verificar se possui reserva de uma sala em uma data específica

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
