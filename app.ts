/* eslint-disable import/first */
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// import ProfileRoutes from './src/profile/route';

const app = express();
app.use(express.json());

// app.use('/api/profiles', ProfileRoutes);


function errorHandler(err: any, req: Request, res: Response) {
  return res.status(400).send({
    message: 'An error occurred while processing this request',
    data: err.toString(),
    stackTrace: err.stack
  });
}

function error404(req: Request, res: Response) {
  return res.status(404).send({
    success: false,
    message: 'Invalid URL'
  });
}

app.use(errorHandler);
app.use(error404);

export default app;