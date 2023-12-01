import app from './app';

const processPort = process.env.NODE_PORT ?? '3000';
const PORT = parseInt(processPort, 10);

const ENV = process.env.NODE_ENV ?? 'development';

app.listen(PORT, () => {
  console.log(`App running in ${ENV} mode on port ${PORT}`);
});