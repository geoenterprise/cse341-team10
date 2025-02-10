const { Schema } = require('mongoose');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Coorperate Company API',
    description: 'Tracks employee, manager and store location',
  },
  host: 'cse341-team10.onrender.com',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
