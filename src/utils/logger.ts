import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp);
  const formattedTimestamp = 
    `${date.toLocaleString('ru-RU', { hour12: false })} :${String(date.getMilliseconds()).padStart(3, '0')}`;

  return `${formattedTimestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    customFormat
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/all-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      maxSize: '10m',
      maxFiles: '3d',
      level: 'info'
    }),
    new DailyRotateFile({
      filename: 'logs/errors-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      maxSize: '10m',
      maxFiles: '3d',
      level: 'error'
    }),
    new transports.Console()
  ]
});

export { logger };