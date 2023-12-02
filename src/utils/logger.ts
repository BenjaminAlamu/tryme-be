// eslint-disable-next-line import/no-import-module-exports
import winston from 'winston';

const enumerateErrorFormat = winston.format((info: any) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message }: { level: string; message: string }) => `${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ]
});

module.exports = logger;
