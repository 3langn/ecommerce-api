import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';

import routes from './routes/v1/index.js';
import { errorHandler } from './middleware/error.js';

import ApiError from './utils/ApiError.js';
import passport from 'passport';
import jwtStrategy from './config/passport.js';

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

export default app;
