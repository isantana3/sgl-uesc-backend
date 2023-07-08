import { Types } from 'mongoose';
import { Room, RoomDocument } from './room.schemas';
import { Pavilion} from '../../pavilions/schemas/pavilion.schemas'

describe('Room', () => {
  it('should be defined', () => {
    const room = new Room();
    expect(room).toBeDefined();
  });

  it('should create a room with specified properties', () => {
    const label = 'Room 1';
    const pavilionId = new Pavilion();

    const room = new Room({
      label,
      pavilion: pavilionId,
    });

    expect(room.label).toEqual(label);
    expect(room.pavilion).toEqual(pavilionId);
  });
});

describe('RoomDocument', () => {
  it('should have correct type', () => {
    const roomDocument: RoomDocument = {} as any;
    expect(roomDocument).toBeDefined();
  });
});
