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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';
import { ResponseItemDto } from './dto/response-item.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Request } from 'express';

@ApiTags('Itens - Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Dado criado com sucesso',
    type: ResponseItemDto,
  })
  create(@Body() createItemDto: CreateItemDto) {
    const { code, description, label, observation, room } = createItemDto;

    return this.itemsService.create({
      code,
      description,
      label,
      observation,
      room,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Dados listados com sucesso',
    isArray: true,
    type: ResponseItemDto,
  })
  findAll(@Query() query: ExpressQuery, @Req() request: Request) {
    const url = request.protocol + '://' + request.get('host') + request.originalUrl;
    return this.itemsService.findAll(query, url);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Visualização de dado realizada com sucesso',
    type: ResponseItemDto,
  })
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Atualização de dado realizada com sucesso',
    type: ResponseItemDto,
  })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const { code, description, label, observation, room } = updateItemDto;
    return this.itemsService.update(id, {
      code,
      description,
      label,
      observation,
      room,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleção de dado realizada com sucesso',
    type: ResponseItemDto,
  })
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
