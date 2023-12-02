import express from 'express';
import dotenv from 'dotenv';
import { errorHandler, error404 } from './src/utils/error-service';

import UserRoutes from './src/user/route';

dotenv.config();
require('./src/config/mongoose');

const app = express();
app.use(express.json());

app.use('/api/user', UserRoutes);

app.use(error404);

app.use(errorHandler);

export default app;
