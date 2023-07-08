import { CheckReservationDto } from './check-reservation.dto';

describe('CheckReservationDto', () => {
  it('should be defined', () => {
    const dto = new CheckReservationDto();
    expect(dto).toBeDefined();
  });

  it('should have the specified properties', () => {
    const room = '643d998881fdb61d5d0b1868';
    const startDate = new Date('2023-06-15T10:00:00.000Z');
    const endDate = new Date('2023-06-15T12:00:00.000Z');

    const dto = new CheckReservationDto();
    dto.room = room;
    dto.startDate = startDate;
    dto.endDate = endDate;

    expect(dto.room).toEqual(room);
    expect(dto.startDate).toEqual(startDate);
    expect(dto.endDate).toEqual(endDate);
  });
});
