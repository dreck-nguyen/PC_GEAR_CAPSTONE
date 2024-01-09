import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'Your API description',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
