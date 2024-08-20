import { Router } from 'express';
import { uploadSparkline, deleteSparkline } from '../controllers/sparkline-api';

const router = Router();

router.post('/', uploadSparkline);
router.delete('/:fileName', deleteSparkline);

export default router;