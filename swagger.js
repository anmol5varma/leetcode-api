// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Leetcode questions API',
    description: 'APIs to retrieve Leetcode questions based on company tags and difficulty levels.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server/routes/question.route.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
