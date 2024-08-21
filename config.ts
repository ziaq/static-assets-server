import 'dotenv/config';
import appRoot from 'app-root-path';
import path from 'path';

class Config {
  microserviceName = 'static-assets-server';
  sparklinesDir = path.join(appRoot.path, 'assets/sparklines');
  tokenLogosDir = path.join(appRoot.path, 'assets/token-logos');
  isTestEnvironment = process.env.NODE_ENV === 'test';

  serverIp: string;
  serverPort: number;
  telegramBotToken: string;
  errorAlertChannelId: string;
  corsOriginUrl: string;

  constructor() {
    this.serverIp = this.validateAndSetVar('SERVER_IP');
    this.serverPort = parseInt(this.validateAndSetVar('SERVER_PORT'), 10);
    this.telegramBotToken = this.validateAndSetVar('TELEGRAM_BOT_TOKEN');
    this.errorAlertChannelId = this.validateAndSetVar('ERROR_ALERT_CHANNEL_ID');
    this.corsOriginUrl = this.validateAndSetVar('CORS_ORIGIN_URL');
  }

  private validateAndSetVar(varName: string): string {
    const value = process.env[varName];

    if (value === undefined) {
      throw new Error(`Environment variable ${varName} is not set.`);
    }
    return value;
  }
}

export const config = new Config();