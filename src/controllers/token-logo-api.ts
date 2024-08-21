import { Request, Response } from 'express';
import multer from 'multer';
import { promisify } from 'util';
import { handleError } from '../utils/handle-error';
import { config } from '../../config';

const tokenLogosDir = config.tokenLogosDir;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tokenLogosDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadToTokenLogosDir = multer({ storage: storage });
const uploadLogo = promisify(uploadToTokenLogosDir.single('file'));

export async function uploadTokenLogo(req: Request, res: Response) {
  try {
    await uploadLogo(req, res);

    if (!req.file) {
      return res.status(400).send('No file provided');
    }

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return res.status(400).send('File problems');
    }

    handleError('endpoint /upload-logo', 'Failed', error as Error);
    res.status(500).send('Internal Server Error');
  }
}