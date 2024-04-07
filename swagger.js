const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PC_GEAR REST API',
      version: '1.0.0',
      description: 'This is a swagger API',
    },
    servers: [
      {
        url: 'http://localhost:3500',
        description: 'This is the local development environment',
      },
      {
        url: 'https://pc-gear-capstone-backup.onrender.com',
        description: 'This is the cloud development environment',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
  },
  apis: ['./allRouter.js'],
  security: [
    {
      BearerAuth: [],
    },
  ],
};
export default options;
