const carService = require('../services/carService');

// Mock repo
jest.mock('../repositories/carRepository', () => ({
  getAllCars: jest.fn(),
}));

const carRepository = require('../repositories/carRepository');

describe('CarService Unit Test', () => {
  test('should filter cars by availability', async () => {
    // Arrange
    const mockCars = [
      { id: 1, available: true },
      { id: 2, available: false },
      { id: 3, available: true },
    ];
    carRepository.getAllCars.mockResolvedValue(mockCars);

    // Act
    const cars = await carService.getAllCars();
    const availableCars = cars.filter(c => c.available);

    // Assert
    expect(availableCars.length).toBe(2);
    expect(availableCars.every(c => c.available)).toBe(true);
  });
});
