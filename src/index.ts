import express from 'express';
import cors from 'cors';
import { logger } from './utils/logger';
import { setFatalErrorHandlers } from './utils/set-fatal-error-handlers';
import { config } from '../config';
import tokenLogoApiRouter from './routes/token-logo-api';
import sparklineApiRouter from './routes/sparkline-api';
import staticAssetsRouter from './routes/static-assets';

const serverIp = config.serverIp;
const serverPort = config.serverPort;

const app = express();
app.use(express.json());

const corsOptions = {
  origin: config.corsOriginUrl,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(staticAssetsRouter);
app.use('/api/upload-logo', tokenLogoApiRouter);
app.use('/api/upload-sparkline', sparklineApiRouter);
app.use('/api/delete-sparkline', sparklineApiRouter);

setFatalErrorHandlers();

app.listen(serverPort, serverIp);
logger.info(`Server is running at ${serverIp}:${serverPort}`);