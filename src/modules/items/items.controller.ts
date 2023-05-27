import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';
import { ResponseItemDto } from './dto/response-item.dto';

@ApiTags('Inventários - Items')
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
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Dados listados com sucesso',
    isArray: true,
    type: ResponseItemDto,
  })
  findAll() {
    return this.itemsService.findAll();
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
    return this.itemsService.update(id, updateItemDto);
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
