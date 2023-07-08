import { UpdateReservationDto } from './update-reservation.dto';

describe('UpdateReservationDto', () => {
  it('should be defined', () => {
    const dto = new UpdateReservationDto();
    expect(dto).toBeDefined();
  });
});
