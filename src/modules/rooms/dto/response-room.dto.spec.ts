import { ResponseRoomDto } from './response-room.dto';

describe('ResponseRoomDto', () => {
  it('should have the correct type', () => {
    const responseRoomDto = new ResponseRoomDto();

    expect(responseRoomDto).toBeDefined();
  });
});
