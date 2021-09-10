const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    message,
    code: statusCode,
    stack: { ...err.stack },
  };

  logger.error(err);

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
};
