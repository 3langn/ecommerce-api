import mongoose from 'mongoose';
import app from './app.js';

import config from './config/config.js';
import logger from './config/logger.js';

logger.info(config.mongoose.url);
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log('Connected Mongoose');
    app.listen(config.port, () => {
      console.log(`Server listening on ${config.port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
