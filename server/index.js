import express from 'express';
import morgan from 'morgan';
import uuid from 'node-uuid';
import config from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { DEFAULT_PORT } from './constants/config';
import { QUESTIONS_URL } from './constants/route';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

import swaggerDocument from '../swagger.json';

config.config();

morgan.token('id', (req) => {
  return req.id;
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const assignId = (req, res, next) => {
  req.id = uuid.v4();
  next();
};
app.use(assignId);
app.use(morgan('tiny'));

const port = process.env.PORT || DEFAULT_PORT;

app.use(QUESTIONS_URL, routes.questions);

app.use(errorHandler);

app.get('/ping', (req, res) => {
  console.log(`${req.id}`);
  res.status(200).send({
    message: 'pong'
  });
});
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
