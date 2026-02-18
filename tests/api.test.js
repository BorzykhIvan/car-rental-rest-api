const request = require('supertest');
const app = require('../app'); // zakładamy, że app.js eksportuje express() zamiast app.listen()

describe('API Integration Test', () => {
  test('GET /cars should return 200 and array', async () => {
    // Arrange + Act
    const response = await request(app).get('/api/v1/cars');

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
