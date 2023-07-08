import { CreatePavilionDto } from './create-pavilion.dto';

describe('CreatePavilionDto', () => {
  it('should create a valid CreatePavilionDto object', () => {
    // Arrange
    const validData = {
      label: 'Pavilhão de Ciências Exatas',
      description: 'Pavilhão de Ciências Exatas localizado próximo a torre da UESC',
      observation: 'Pavilhão não possui elevador',
    };

    // Act
    const dto = new CreatePavilionDto();
    dto.label = validData.label;
    dto.description = validData.description;
    dto.observation = validData.observation;

    // Assert
    expect(dto.label).toEqual(validData.label);
    expect(dto.description).toEqual(validData.description);
    expect(dto.observation).toEqual(validData.observation);
  });
});
