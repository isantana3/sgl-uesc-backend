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
import { CreateRoomDto } from './dto/create-room.dto';
import { ResponseRoomDto } from './dto/response-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('Salas - Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Dado criado com sucesso',
    type: ResponseRoomDto,
  })
  create(@Body() createRoomDto: CreateRoomDto) {
    const { label, pavilion } = createRoomDto;
    return this.roomsService.create({ label, pavilion });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Dados listados com sucesso',
    isArray: true,
    type: ResponseRoomDto,
  })
  findAll(@Query() query: ExpressQuery, @Req() request: Request) {
    const url = request.protocol + '://' + request.get('host') + request.originalUrl;
    return this.roomsService.findAll(query, url);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Visualização de dado realizada com sucesso',
    type: ResponseRoomDto,
  })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Atualização de dado realizada com sucesso',
    type: ResponseRoomDto,
  })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const { label, pavilion } = updateRoomDto;
    return this.roomsService.update(id, { label, pavilion });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleção de dado realizada com sucesso',
    type: ResponseRoomDto,
  })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
