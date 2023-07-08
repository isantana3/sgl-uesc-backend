import { ResponsePavilionDto } from './response-pavilion.dto';

describe('ResponsePavilionDto', () => {
  it('should create a valid ResponsePavilionDto object', () => {
    // Arrange
    const validData = {
      _id: '6456eda63f9ebbed160ec2fb',
      createdAt: new Date('2023-05-15T00:57:46.762Z'),
      updatedAt: new Date('2023-05-15T00:57:46.762Z'),
      label: 'Pavilhão de Ciências Exatas',
      description: 'Pavilhão de Ciências Exatas localizado próximo a torre da UESC',
      observation: 'Pavilhão não possui elevador',
    };

    // Act
    const dto = new ResponsePavilionDto();
    dto._id = validData._id;
    dto.createdAt = validData.createdAt;
    dto.updatedAt = validData.updatedAt;
    dto.label = validData.label;
    dto.description = validData.description;
    dto.observation = validData.observation;

    // Assert
    expect(dto._id).toEqual(validData._id);
    expect(dto.createdAt).toEqual(validData.createdAt);
    expect(dto.updatedAt).toEqual(validData.updatedAt);
    expect(dto.label).toEqual(validData.label);
    expect(dto.description).toEqual(validData.description);
    expect(dto.observation).toEqual(validData.observation);
  });
});
