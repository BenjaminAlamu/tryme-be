import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron';
import { getPending } from './src/task/services/task';
import logger = require('./src/utils/logger');

import { errorHandler, error404 } from './src/utils/error-service';

import UserRoutes from './src/user/route';
import TaskRoutes from './src/task/route';

dotenv.config();
require('./src/config/mongoose');

cron.schedule('0 8 * * *', () => {
  logger.info('Running notification cron');
  getPending();
});

const app = express();
app.use(cors('*'));
app.use(express.json());

app.use('/api/user', UserRoutes);
app.use('/api/task', TaskRoutes);

app.use(error404);

app.use(errorHandler);

export default app;
