import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from './schemas/inventory.schemas';
import { Model } from 'mongoose';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,

    private readonly roomsServices: RoomsService,
  ) {}
  private async checkRoomExists(roomId) {
    const roomExists = await this.roomsServices.findOne(roomId);

    if (!roomExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Room Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async create(createInventoryDto: CreateInventoryDto) {
    await this.checkRoomExists(createInventoryDto.roomId);

    return await this.inventoryModel.create(createInventoryDto);
  }
  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find().populate('roomId').exec();
  }

  async findOne(id: string): Promise<Inventory> {
    const result = await this.inventoryModel.findOne({ _id: id }).exec();
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Inventory Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async update(
    id: string,
    updateRoomDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    if (updateRoomDto.roomId) {
      await this.checkRoomExists(updateRoomDto.roomId);
    }

    await this.inventoryModel.updateOne({ _id: id }, updateRoomDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<Inventory> {
    const deletedItem = await this.inventoryModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
