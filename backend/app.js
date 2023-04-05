require('dotenv').config();

const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const serverError = require('./middlewares/serverError');

const app = express();

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

app.use(express.json());

app.use(requestLogger);
app.use(cors);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(serverError);

app.listen(PORT);
