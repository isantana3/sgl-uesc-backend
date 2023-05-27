import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePavilionDto } from './dto/create-pavilion.dto';
import { ResponsePavilionDto } from './dto/response-pavilion.dto';
import { UpdatePavilionDto } from './dto/update-pavilion.dto';
import { PavilionsService } from './pavilions.service';

@ApiBearerAuth()
@ApiTags('Pavilhões - Pavilions')
@Controller('pavilions')
export class PavilionsController {
  constructor(private readonly pavilionsService: PavilionsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Dado criado com sucesso',
    type: ResponsePavilionDto,
  })
  create(@Body() createPavilionDto: CreatePavilionDto) {
    const { description, label, observation } = createPavilionDto;
    return this.pavilionsService.create({ description, label, observation });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Dados listados com sucesso',
    isArray: true,
    type: ResponsePavilionDto,
  })
  findAll() {
    return this.pavilionsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Visualização de dado realizada com sucesso',
    type: ResponsePavilionDto,
  })
  findOne(@Param('id') id: string) {
    return this.pavilionsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Atualização de dado realizada com sucesso',
    type: ResponsePavilionDto,
  })
  update(
    @Param('id') id: string,
    @Body() updatePavilionDto: UpdatePavilionDto,
  ) {
    const { description, label, observation } = updatePavilionDto;
    return this.pavilionsService.update(id, {
      description,
      label,
      observation,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleção de dado realizada com sucesso',
    type: ResponsePavilionDto,
  })
  remove(@Param('id') id: string) {
    return this.pavilionsService.remove(id);
  }
}
