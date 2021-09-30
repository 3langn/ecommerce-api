import logger from '../config/logger.js';
import config from '../config/config.js';

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    message,
    code: statusCode,
    stack: err.stack,
  };
  if (config.env === 'development') {
    logger.error(err);
  }
  res.status(statusCode).send(response);
};

export { errorHandler };
