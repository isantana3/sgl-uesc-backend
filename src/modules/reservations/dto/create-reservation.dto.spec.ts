import { CreateReservationDto } from './create-reservation.dto';

describe('CreateReservationDto', () => {
  it('should be defined', () => {
    const createReservationDto = new CreateReservationDto();
    expect(createReservationDto).toBeDefined();
  });

  it('should validate the label property', () => {
    const createReservationDto = new CreateReservationDto();
    createReservationDto.label = 'Aula de programação 1';
    expect(createReservationDto.label).toEqual('Aula de programação 1');
  });

  it('should validate the previousObservation property', () => {
    const createReservationDto = new CreateReservationDto();
    createReservationDto.previousObservation = 'Ventilador não estava funcionando';
    expect(createReservationDto.previousObservation).toEqual('Ventilador não estava funcionando');
  });

  it('should validate the laterObservation property', () => {
    const createReservationDto = new CreateReservationDto();
    createReservationDto.laterObservation = 'Ventilador parou de funcionar';
    expect(createReservationDto.laterObservation).toEqual('Ventilador parou de funcionar');
  });

  it('should validate the responsible property', () => {
    const createReservationDto = new CreateReservationDto();
    createReservationDto.responsible = '643d998881fdb61d5d0b1868';
    expect(createReservationDto.responsible).toEqual('643d998881fdb61d5d0b1868');
  });

  it('should validate the room property', () => {
    const createReservationDto = new CreateReservationDto();
    createReservationDto.room = '643d998881fdb61d5d0b1868';
    expect(createReservationDto.room).toEqual('643d998881fdb61d5d0b1868');
  });

  it('should validate the startDate property', () => {
    const createReservationDto = new CreateReservationDto();
    const startDate = new Date('2023-06-15T10:00:00.000Z');
    createReservationDto.startDate = startDate;
    expect(createReservationDto.startDate).toEqual(startDate);
  });

  it('should validate the endDate property', () => {
    const createReservationDto = new CreateReservationDto();
    const endDate = new Date('2023-06-15T12:00:00.000Z');
    createReservationDto.endDate = endDate;
    expect(createReservationDto.endDate).toEqual(endDate);
  });

  it('should validate the status property', () => {
    const createReservationDto = new CreateReservationDto();
    createReservationDto.status = 'reserved';
    expect(createReservationDto.status).toEqual('reserved');
  });

  it('should validate the semester property', () => {
    const createReservationDto = new CreateReservationDto();
    createReservationDto.semester = {
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-06-30'),
      type: 'weekly',
    };
    expect(createReservationDto.semester).toEqual({
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-06-30'),
      type: 'weekly',
    });
  });
});
