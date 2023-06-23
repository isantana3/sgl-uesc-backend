import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Query as ExpressQuery } from 'express-serve-static-core';

@ApiBearerAuth()
@ApiTags('Usuários - Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Dado criado com sucesso',
    type: ResponseUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    const { email, name, office, password, registration, role } = createUserDto;
    return this.usersService.create({
      email,
      name,
      office,
      password,
      registration,
      role,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Dados listados com sucesso',
    isArray: true,
    type: ResponseUserDto,
  })
  findAll(@Query() query: ExpressQuery) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Visualização de dado realizada com sucesso',
    type: ResponseUserDto,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Atualização de dado realizada com sucesso',
    type: ResponseUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { email, name, office, password, registration, role } = updateUserDto;
    return this.usersService.update(id, {
      email,
      name,
      office,
      password,
      registration,
      role,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Deleção de dado realizada com sucesso',
    type: ResponseUserDto,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
