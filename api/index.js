import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import uuid from 'node-uuid';
import config from 'dotenv';
import locationRoutes from './server/routes/location.route';
import appointmentRoutes from './server/routes/appointment.route';
import testRoutes from './server/routes/tests.route';
import { APPOINTMENT_URL, LOCATION_URL, TEST_RESULT_URL } from './constants/route'
import { DEFAULT_PORT } from './constants/config'

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

const port = process.env.PORT || DEFAULT_PORT;

app.use(LOCATION_URL, locationRoutes);
app.use(APPOINTMENT_URL, appointmentRoutes);
app.use(TEST_RESULT_URL, testRoutes);

app.get('/ping', (req, res) => res.status(200).send({
   message: 'pong'
}));

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;