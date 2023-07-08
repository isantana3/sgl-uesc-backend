import { Room } from 'src/modules/rooms/schemas/room.schemas';
import { Item, ItemDocument } from './item.schemas';

describe('Item', () => {
  it('should be defined', () => {
    const item = new Item();
    expect(item).toBeDefined();
  });

//   it('should create an item with specified properties', () => {
//     const label = 'Item 1';
//     const code = 'ABC123';
//     const room = new Room()
//     const description = 'This is item 1';
//     const observation = 'Some observations about item 1';

//     const item = new Item({
//         label,
//         code,
//         room,
//         description,
//         observation,
//     });

//     expect(item.label).toEqual(label);
//     expect(item.code).toEqual(code);
//     expect(item.description).toEqual(description);
//     expect(item.observation).toEqual(observation);
//   });
});

describe('ItemDocument', () => {
  it('should have correct type', () => {
    const itemDocument: ItemDocument = {} as any;
    expect(itemDocument).toBeDefined();
  });
});
