import { config } from '../../config';
import { logger } from './logger';
import { sendTgMsg } from './send-tg-msg';

export function setFatalErrorHandlers() {
  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception. Error: ${error}`);
    sendTgMsg(
      `Module ${config.microserviceName} died`, config.errorAlertChannelId
    ).then(() => process.exit(1));
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled promise rejection, promise ${JSON.stringify(promise)} reason ${reason}`);
    sendTgMsg(
      `Module ${config.microserviceName} died`, config.errorAlertChannelId
    ).then(() => process.exit(1));
  });
}