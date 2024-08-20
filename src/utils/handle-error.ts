import { config } from '../../config';
import { logger } from './logger';
import { sendTgMsg } from './send-tg-msg';

export async function handleError(
  moduleName: string,
  text: string,
  error: Error | { message: string },
) {

  const errorMsg = `Error in ${moduleName} (${config.microserviceName}). ${text}. Error: ${error.message}`;
  
  logger.error(errorMsg);
  sendTgMsg(errorMsg, config.errorAlertChannelId);
}