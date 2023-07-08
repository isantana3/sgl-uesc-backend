import { Reservation, ReservationDocument, TStatus, ISemester } from './reservation.schemas';
import { User } from '../../users/schemas/user.schemas';
import { Room } from '../../rooms/schemas/room.schemas';

describe('Reservation', () => {
  it('should be defined', () => {
    const reservation = new Reservation();
    expect(reservation).toBeDefined();
  });

  it('should create a reservation with specified properties', () => {
    const label = 'Reservation 1';
    const previousObservation = 'Previous observation';
    const laterObservation = 'Later observation';
    const responsible = new User();
    const room = new Room();
    const startDate = new Date('2023-06-01');
    const endDate = new Date('2023-06-02');
    const status: TStatus = 'reserved';
    const semester: ISemester = {
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-06-30'),
      type: 'weekly',
    };

    const reservation = new Reservation();
    reservation.label = label
    reservation.previousObservation = previousObservation
    reservation.laterObservation = laterObservation
    reservation.responsible = responsible
    reservation.room = room
    reservation.startDate = startDate
    reservation.endDate = endDate
    reservation.status = status
    reservation.semester = semester
   

    expect(reservation.label).toEqual(label);
    expect(reservation.previousObservation).toEqual(previousObservation);
    expect(reservation.laterObservation).toEqual(laterObservation);
    expect(reservation.responsible).toEqual(responsible);
    expect(reservation.room).toEqual(room);
    expect(reservation.startDate).toEqual(startDate);
    expect(reservation.endDate).toEqual(endDate);
    expect(reservation.status).toEqual(status);
    expect(reservation.semester).toEqual(semester);
  });
});

describe('ReservationDocument', () => {
  it('should have correct type', () => {
    const reservationDocument: ReservationDocument = {} as any;
    expect(reservationDocument).toBeDefined();
  });
});
