import { UpdateRoomDto } from './update-room.dto';

describe('UpdateRoomDto', () => {
  it('should have the correct type', () => {
    const updateRoomDto = new UpdateRoomDto();

    expect(updateRoomDto).toBeDefined();
  });
});
