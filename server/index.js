import express from 'express';
import morgan from 'morgan';
import uuid from 'node-uuid';
import config from 'dotenv';
import { DEFAULT_PORT } from './constants/config'
import { USER_URL } from './constants/route'
import routes from './routes'

config.config();

morgan.token('id', function getId(req) {
   return req.id
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({
   extended: true
}));

const assignId = (req, res, next) => {
   req.id = uuid.v4()
   next()
}
app.use(assignId)
app.use(morgan('tiny'))

const port = process.env.PORT || DEFAULT_PORT;

app.use(USER_URL, routes.user)

app.get('/ping', (req, res) => res.status(200).send({
   message: 'pong'
}));



app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;