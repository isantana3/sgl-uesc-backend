import { Pavilion, PavilionDocument } from './pavilion.schemas';

describe('Pavilion', () => {
  it('should be defined', () => {
    const pavilion = new Pavilion();
    expect(pavilion).toBeDefined();
  });

  it('should create a pavilion with specified properties', () => {
    const label = 'Pavilion 1';
    const description = 'This is the first pavilion';
    const observation = 'Some observations about the pavilion';

    const pavilion = new Pavilion({
      label,
      description,
      observation,
    });

    expect(pavilion.label).toEqual(label);
    expect(pavilion.description).toEqual(description);
    expect(pavilion.observation).toEqual(observation);
  });
});

describe('PavilionDocument', () => {
  it('should have correct type', () => {
    const pavilionDocument: PavilionDocument = {} as any;
    expect(pavilionDocument).toBeDefined();
  });
});
