import app from './app';
import logger = require('./src/utils/logger');

const processPort = process.env.NODE_PORT ?? '3000';
const PORT = parseInt(processPort, 10);

const ENV = process.env.NODE_ENV ?? 'development';

app.listen(PORT, () => {
  logger.info(`App running in ${ENV} mode on port ${PORT}`);
});
