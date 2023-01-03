const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const handlerErrors = require('./middlewares/handlerErrors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { NODE_ENV, URL_DB, PORT = 3000 } = process.env;
const app = express();

app.use(cors(
  {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
));

mongoose.connect(NODE_ENV === 'production' ? URL_DB : 'mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT);
