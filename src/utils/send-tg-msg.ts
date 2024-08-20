import { Telegraf } from 'telegraf';
import { config } from '../../config';
import { logger } from './logger';

const bot = new Telegraf(config.telegramBotToken);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export async function sendTgMsg(message: string, chatId: string = config.errorAlertChannelId) {
  try {
    await bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      // @ts-expect-error due to some type problems
      disable_web_page_preview: true,
    });

  } catch (error) {
    logger.error(`Can not send message to telegram. Error: ${(error as Error).message}`);
  }
}