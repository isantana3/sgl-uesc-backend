import { FindReservationFilterDto } from './find-reservations-filter-dto';

describe('FindReservationFilterDto', () => {
  it('should be defined', () => {
    const findReservationFilterDto = new FindReservationFilterDto();
    expect(findReservationFilterDto).toBeDefined();
  });

  it('should validate the startDate property', () => {
    const findReservationFilterDto = new FindReservationFilterDto();
    findReservationFilterDto.startDate = '2022-03-01';
    expect(findReservationFilterDto.startDate).toEqual('2022-03-01');
  });

  it('should validate the endDate property', () => {
    const findReservationFilterDto = new FindReservationFilterDto();
    findReservationFilterDto.endDate = '2022-03-01';
    expect(findReservationFilterDto.endDate).toEqual('2022-03-01');
  });

  it('should validate the room property', () => {
    const findReservationFilterDto = new FindReservationFilterDto();
    findReservationFilterDto.room = '643d998881fdb61d5d0b1868';
    expect(findReservationFilterDto.room).toEqual('643d998881fdb61d5d0b1868');
  });

  it('should validate the responsible property', () => {
    const findReservationFilterDto = new FindReservationFilterDto();
    findReservationFilterDto.responsible = '643d998881fdb61d5d0b1868';
    expect(findReservationFilterDto.responsible).toEqual('643d998881fdb61d5d0b1868');
  });

  it('should validate the pavilion property', () => {
    const findReservationFilterDto = new FindReservationFilterDto();
    findReservationFilterDto.pavilion = '643d998881fdb61d5d0b1868';
    expect(findReservationFilterDto.pavilion).toEqual('643d998881fdb61d5d0b1868');
  });

  it('should validate the limit property', () => {
    const findReservationFilterDto = new FindReservationFilterDto();
    findReservationFilterDto.limit = '10';
    expect(findReservationFilterDto.limit).toEqual('10');
  });

  it('should validate the page property', () => {
    const findReservationFilterDto = new FindReservationFilterDto();
    findReservationFilterDto.page = '1';
    expect(findReservationFilterDto.page).toEqual('1');
  });
});
