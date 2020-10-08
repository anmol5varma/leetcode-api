import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import uuid from 'node-uuid';
import config from 'dotenv';
import locationRoutes from './server/routes/location.route';

config.config();

morgan.token('id', function getId(req) {
   return req.id
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const assignId = (req, res, next) => {
   req.id = uuid.v4()
   next()
}
app.use(assignId)
app.use(morgan('tiny'))

app.use(cors());

const port = process.env.PORT || 8080;
// when a random route is inputed

app.use('/api/v1/location', locationRoutes);

app.get('/ping', (req, res) => res.status(200).send({
   message: 'pong'
}));

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;