import { UpdatePavilionDto } from './update-pavilion.dto';

describe('UpdatePavilionDto', () => {
  it('should create a valid UpdatePavilionDto object', () => {
    // Arrange
    const validData = {
      label: 'Novo rótulo do pavilhão',
      description: 'Nova descrição do pavilhão',
      observation: 'Nova observação do pavilhão',
    };

    // Act
    const dto = new UpdatePavilionDto();
    dto.label = validData.label;
    dto.description = validData.description;
    dto.observation = validData.observation;

    // Assert
    expect(dto.label).toEqual(validData.label);
    expect(dto.description).toEqual(validData.description);
    expect(dto.observation).toEqual(validData.observation);
  });
});
