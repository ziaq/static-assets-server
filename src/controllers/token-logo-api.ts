import { Request, Response } from 'express';
import multer from 'multer';
import { handleError } from '../utils/handle-error';
import { config } from '../../config';
import { promisify } from 'util';

const tokenLogosDir = config.tokenLogosDir;

const logoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tokenLogosDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadLogo = multer({ storage: logoStorage }).single('file');
const uploadLogoAsync = promisify(uploadLogo);

export async function uploadTokenLogo(req: Request, res: Response) {
  try {
    await uploadLogoAsync(req, res);
    res.status(200).send('File uploaded successfully');
    
  } catch (error) {
    handleError(
      'endpoint /upload-logo', 
      'Failed', 
      error as Error,
    );
    
    res.status(500).send('Internal Server Error');
  }
}