import { AvailableRoomsDto } from './available-rooms.dto';

describe('AvailableRoomsDto', () => {
  it('should be defined', () => {
    const dto = new AvailableRoomsDto();
    expect(dto).toBeDefined();
  });

  it('should have the specified properties', () => {
    const pavilion = '643d998881fdb61d5d0b1868';
    const startDate = new Date('2023-06-15T10:00:00.000Z');
    const endDate = new Date('2023-06-15T12:00:00.000Z');

    const dto = new AvailableRoomsDto();
    dto.pavilion = pavilion;
    dto.startDate = startDate;
    dto.endDate = endDate;

    expect(dto.pavilion).toEqual(pavilion);
    expect(dto.startDate).toEqual(startDate);
    expect(dto.endDate).toEqual(endDate);
  });
});
