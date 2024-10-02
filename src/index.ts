import express, { Express  } from 'express';
import cors from 'cors';
import helmet from "helmet";
import { logger } from './utils/logger';
import { setFatalErrorHandlers } from './utils/set-fatal-error-handlers';
import { config } from '../config';
import tokenLogoApiRouter from './routes/token-logo-api';
import sparklineApiRouter from './routes/sparkline-api';
import staticAssetsRouter from './routes/static-assets';

const serverIp = config.serverIp;
const serverPort = config.serverPort;

export const app: Express = express();
app.use(express.json());

const corsOptions = {
  origin: config.corsOriginUrl,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(helmet());

app.use(staticAssetsRouter);
app.use('/api/upload-logo', tokenLogoApiRouter);
app.use('/api/upload-sparkline', sparklineApiRouter);
app.use('/api/delete-sparkline', sparklineApiRouter);

setFatalErrorHandlers();

if (!config.isTestEnvironment) {
  app.listen(serverPort, serverIp, () => {
    logger.info(`Server is running at http://${serverIp}:${serverPort}`);
  });
}