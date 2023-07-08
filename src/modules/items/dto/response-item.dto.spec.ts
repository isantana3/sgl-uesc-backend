import { ResponseItemDto } from './response-item.dto';
import { validateSync } from 'class-validator';

describe('ResponseItemDto', () => {
  it('should be defined', () => {
    const responseItemDto = new ResponseItemDto();
    expect(responseItemDto).toBeDefined();
  });

  it('should validate the label, code, and room property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto.label = 'Cadeira';
    responseItemDto.code = 'AD28SD98';
    responseItemDto.room = '643d998881fdb61d5d0b1868';

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(0);
  });

  it('should validate the label property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto.label = 'Cadeira';

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(2);
  });

  it('should validate the code property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto.code = 'AD28SD98';

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(2);
  });

  it('should validate the room property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto.room = '643d998881fdb61d5d0b1868';

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(2);
  });

  it('should validate the description property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto.description = 'Item cor vermelho';

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(3);
  });

  it('should validate the observation property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto.observation = 'Item possui avarias';

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(3);
  });

  it('should validate the _id property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto._id = '6456eda63f9ebbed160ec2fb';

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(3);
  });

  it('should validate the createdAt property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto.createdAt = new Date('2023-05-15T00:57:46.762Z');

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(3);
  });

  it('should validate the updatedAt property', () => {
    const responseItemDto = new ResponseItemDto();
    responseItemDto.updatedAt = new Date('2023-05-15T00:57:46.762Z');

    const errors = validateSync(responseItemDto);
    expect(errors.length).toEqual(3);
  });
});
