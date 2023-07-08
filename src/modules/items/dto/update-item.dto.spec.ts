import { UpdateItemDto } from './update-item.dto';
import { validateSync } from 'class-validator';

describe('UpdateItemDto', () => {
  it('should be defined', () => {
    const updateItemDto = new UpdateItemDto();
    expect(updateItemDto).toBeDefined();
  });

  it('should validate the label property', () => {
    const updateItemDto = new UpdateItemDto();
    updateItemDto.label = 'Cadeira';

    const errors = validateSync(updateItemDto);
    expect(errors.length).toEqual(0);
  });

  it('should validate the code property', () => {
    const updateItemDto = new UpdateItemDto();
    updateItemDto.code = 'AD28SD98';

    const errors = validateSync(updateItemDto);
    expect(errors.length).toEqual(0);
  });

  it('should validate the room property', () => {
    const updateItemDto = new UpdateItemDto();
    updateItemDto.room = '643d998881fdb61d5d0b1868';

    const errors = validateSync(updateItemDto);
    expect(errors.length).toEqual(0);
  });

  it('should validate the description property', () => {
    const updateItemDto = new UpdateItemDto();
    updateItemDto.description = 'Item cor vermelho';

    const errors = validateSync(updateItemDto);
    expect(errors.length).toEqual(0);
  });

  it('should validate the observation property', () => {
    const updateItemDto = new UpdateItemDto();
    updateItemDto.observation = 'Item possui avarias';

    const errors = validateSync(updateItemDto);
    expect(errors.length).toEqual(0);
  });
});
