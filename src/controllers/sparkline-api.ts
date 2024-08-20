import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { handleError } from '../utils/handle-error';
import { config } from '../../config';

const sparklinesDir = config.sparklinesDir;

export async function uploadSparkline (req: Request, res: Response) {
  const { fileName, svgContent } = req.body;
  const filePath = path.join(sparklinesDir, fileName);

  try {
    await fs.writeFile(filePath, svgContent);
    res.status(200).send('Success');
    
  } catch (error) {
    handleError(
      'endpoint /upload-sparkline',
      `Failed. fileName ${fileName}`,
      error as Error,
    );

    res.status(500).send('Internal Server Error while saving the sparkline');
  }
}

export async function deleteSparkline (req: Request, res: Response) {
  const fileName = req.params.fileName;
  const filePath = path.join(sparklinesDir, fileName);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    res.status(200).send('Success');
    
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      res.status(404).send('File not found');

    } else {
      handleError(
        'endpoint /delete-sparkline',
        `Failed. fileName ${fileName}`,
        error as Error,
      );

      res.status(500).send('Internal Server Error while deleting the sparkline');
    }
  }
}