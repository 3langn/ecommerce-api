const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');

const routes = require('./routes/v1');
const { errorHandler } = require('./middleware/error');

const ApiError = require('./utils/ApiError');
const passport = require('passport');
const jwtStrategy = require('./config/passport');
const { application } = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use(passport.initialize());
passport.use(jwtStrategy);

app.use('/v1', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorHandler);

module.exports = app;
