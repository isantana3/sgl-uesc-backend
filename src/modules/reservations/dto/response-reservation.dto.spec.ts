import { ResponseReservationDto } from './response-reservation.dto';

describe('ResponseReservationDto', () => {
  it('should be defined', () => {
    const responseReservationDto = new ResponseReservationDto();
    expect(responseReservationDto).toBeDefined();
  });

  it('should inherit properties from CreateReservationDto', () => {
    const label = 'Aula de programação 1';
    const previousObservation = 'Ventilador não estava funcionando';
    const laterObservation = 'Ventilador parou de funcionar';
    const responsible = '643d998881fdb61d5d0b1868';
    const room = '643d998881fdb61d5d0b1868';
    const startDate = new Date('2023-06-15T10:00:00.000Z');
    const endDate = new Date('2023-06-15T12:00:00.000Z');
    const status = 'reserved';
    const semester = {
        startDate: new Date('2023-06-01T00:00:00.000Z'),
        endDate: new Date('2023-06-30T23:59:59.999Z'),
        type: 'weekly' as const,
    };

    const responseReservationDto = new ResponseReservationDto();
    responseReservationDto.label = label
    responseReservationDto.previousObservation = previousObservation
    responseReservationDto.laterObservation = laterObservation
    responseReservationDto.responsible = responsible
    responseReservationDto.room = room
    responseReservationDto.startDate = startDate
    responseReservationDto.endDate = endDate
    responseReservationDto.status = status
    responseReservationDto.semester = semester

    expect(responseReservationDto.label).toEqual(label);
    expect(responseReservationDto.previousObservation).toEqual(previousObservation);
    expect(responseReservationDto.laterObservation).toEqual(laterObservation);
    expect(responseReservationDto.responsible).toEqual(responsible);
    expect(responseReservationDto.room).toEqual(room);
    expect(responseReservationDto.startDate).toEqual(startDate);
    expect(responseReservationDto.endDate).toEqual(endDate);
    expect(responseReservationDto.status).toEqual(status);
    expect(responseReservationDto.semester).toEqual(semester);
  });

});
