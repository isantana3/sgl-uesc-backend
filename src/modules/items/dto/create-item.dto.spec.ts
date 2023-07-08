import { CreateItemDto } from './create-item.dto';
import { validateSync } from 'class-validator';

describe('CreateItemDto', () => {
  it('should be defined', () => {
    const createItemDto = new CreateItemDto();
    expect(createItemDto).toBeDefined();
  });

  it('should validate the label, code, and room property', () => {
    const createItemDto = new CreateItemDto();
    createItemDto.label = 'Cadeira';
    createItemDto.code = 'AD28SD98';
    createItemDto.room = '643d998881fdb61d5d0b1868';

    const errors = validateSync(createItemDto);
    expect(errors.length).toEqual(0);
  });

  it('should validate the label property', () => {
    const createItemDto = new CreateItemDto();
    createItemDto.label = 'Cadeira';

    const errors = validateSync(createItemDto);
    expect(errors.length).toEqual(2);
  });

  it('should validate the code property', () => {
    const createItemDto = new CreateItemDto();
    createItemDto.code = 'AD28SD98';

    const errors = validateSync(createItemDto);
    expect(errors.length).toEqual(2);
  });

  it('should validate the room property', () => {
    const createItemDto = new CreateItemDto();
    createItemDto.room = '643d998881fdb61d5d0b1868';

    const errors = validateSync(createItemDto);
    expect(errors.length).toEqual(2);
  });

  it('should validate the description property', () => {
    const createItemDto = new CreateItemDto();
    createItemDto.description = 'Item cor vermelho';

    const errors = validateSync(createItemDto);
    expect(errors.length).toEqual(3);
  });

  it('should validate the observation property', () => {
    const createItemDto = new CreateItemDto();
    createItemDto.observation = 'Item possui avarias';

    const errors = validateSync(createItemDto);
    expect(errors.length).toEqual(3);
  });
});
