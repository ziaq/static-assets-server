import { Server } from 'http';
import axios, { AxiosError } from 'axios';
import FormData from 'form-data';
import appRoot from 'app-root-path';
import { app } from '../index';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { config } from '../../config';

describe('POST /api/upload-logo', () => {
  const testServerIp = '127.0.0.1';
  const testServerPort = 3002;
  let server: Server;

  const uploadFilePath = path.join(appRoot.path, 'assets/token-logos/test-logo.png');
  const uploadedFilePath = path.join(config.tokenLogosDir, 'temp-test-logo.png');

  beforeAll(() => {
    server = app.listen(testServerPort, testServerIp, () => {
      console.log(`Server is running at ${testServerIp}:${testServerPort}`)
    });
  });

  afterAll(async () => {
    server.close();

    try {
      await fs.unlink(uploadedFilePath);
    } catch (error) {
      console.log(`Error during temp-test-logo deletion. Error ${error}`);
    }
  });

  it('should upload a file', async () => {
    const form = new FormData();
    form.append('file', fsSync.createReadStream(uploadFilePath), 'temp-test-logo.png');

    const res = await axios.post(`http://${testServerIp}:${testServerPort}/api/upload-logo`, form, {
      headers: {
        ...form.getHeaders()
      }
    });

    expect(res.status).toBe(200);
    
    const stats = await fs.stat(uploadedFilePath);
    expect(stats).toBeDefined(); 
  });

  it('should return a 400 error code', async () => {
    try {
      await axios.post(`http://${testServerIp}:${testServerPort}/api/upload-logo`);

    } catch(error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);

      } else {
        throw error;
      }
    }
  });
});