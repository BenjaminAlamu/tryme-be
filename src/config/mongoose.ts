import mongoose = require('mongoose');
import logger = require('../utils/logger');

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.ENVIRONMENT === 'test' ? process.env.DB_CONN_TEST : process.env.DB_CONN)
  .then(() => {
    logger.info('Database Connected successfully');
  })
  .catch((err: Error) => {
    logger.error('Not connected');
    logger.error(err);
  });

module.exports = { mongoose };
