import express, { Router, Request, Response, NextFunction } from 'express';
import { config } from '../../config';

const router = Router();

function setHeadersForSparkline() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'max-age=7200');
    next();
  };
}

function setHeadersForTokenLogo() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'max-age=31536000');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  };
}

function handleFileNotFound() {
  return (req: Request, res: Response) => {
    if (!res.headersSent) res.status(404).send(`File not found`);
  };
}

router.use('/sparklines', setHeadersForSparkline(), express.static(config.sparklinesDir), handleFileNotFound());
router.use('/token-logos', setHeadersForTokenLogo(), express.static(config.tokenLogosDir), handleFileNotFound());

export default router;