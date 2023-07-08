import { CreateRoomDto } from './create-room.dto';

describe('CreateRoomDto', () => {
  it('should validate the label property', () => {
    const createRoomDto = new CreateRoomDto();
    createRoomDto.label = 'Laboratório 20';

    expect(createRoomDto.label).toEqual('Laboratório 20');
  });

  it('should validate the pavilion property', () => {
    const createRoomDto = new CreateRoomDto();
    createRoomDto.pavilion = '643d998881fdb61d5d0b1868';

    expect(createRoomDto.pavilion).toEqual('643d998881fdb61d5d0b1868');
  });
});
