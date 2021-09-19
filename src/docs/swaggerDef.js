import config from '../config/config.js';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Sub Facebook API documentation',
    version: process.env.npm_package_version,
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
