import { Router } from 'express';
import { uploadTokenLogo } from '../controllers/token-logo-api';

const router = Router();

router.post('/', uploadTokenLogo);

export default router;