const { Schema } = require('mongoose');
const fs = require('fs')
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Coorperate Company API',
    description: 'Tracks employee, manager and store location',
  },
  host: 'cse341-team10.onrender.com', // cse341-team10.onrender.com || localhost3100
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Read the generated swagger.json
  fs.readFile(outputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading swagger.json:', err);
      return;
    }
 
    let swaggerData = JSON.parse(data);
 
    // Remove specific routes
    
    delete swaggerData.paths["/github/callback"];
    delete swaggerData.paths["/login"];
    delete swaggerData.paths["/logout"];
 
    // Write back the modified swagger.json
    fs.writeFile(outputFile, JSON.stringify(swaggerData, null, 2), (err) => {
      if (err) {
        console.error('Error writing swagger.json:', err);
      } else {
        console.log('Swagger.json updated: Excluded hidden routes');
      }
    });
  });
});