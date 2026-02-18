const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Rental API',
      version: '1.0.0',
      description: 'REST API wypożyczalni samochodów (N-tier)',
    },
    servers: [
      { url: 'http://localhost:3000/api/v1' },
    ],
  },
  apis: ['./routes/*.js'], // pliki z komentarzami swaggera
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
