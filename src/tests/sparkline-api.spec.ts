import { Server } from 'http';
import axios, { AxiosError } from 'axios';
import { app } from '../index';
import path from 'path';
import fs from 'fs/promises';
import { config } from '../../config';

describe('POST and DELETE /api/upload-sparkline', () => {
  const testServerIp = '127.0.0.1';
  const testServerPort = 3001;
  let server: Server;

  beforeAll(() => {
    server = app.listen(testServerPort, testServerIp, () => {
      console.log(`Server is running at ${testServerIp}:${testServerPort}`)
    });
  });

  afterAll(() => {
    server.close();
  })

  it('should upload a sparkline', async () => {
    const testFileName = 'upload-test.svg';
    const testSparklinePath = path.join(config.sparklinesDir, testFileName);

    const res = await axios.post(`http://${testServerIp}:${testServerPort}/api/upload-sparkline`, {
      fileName: testFileName,
      svgContent: 'svg-content',
    })

    expect(res.status).toBe(200);

    const fileStats = await fs.stat(testSparklinePath);
    if (fileStats) {
      await fs.unlink(testSparklinePath);
    }
  })

  it('should delete sparkline', async () => {
    const testFileName = 'delete-test.svg';
    const testSparklinePath = path.join(config.sparklinesDir, testFileName);

    await fs.writeFile(testSparklinePath, 'svg-content');

    try {
      const res = await axios.delete(`http://${testServerIp}:${testServerPort}/api/upload-sparkline/${testFileName}`);
      expect(res.status).toBe(200);

    } catch {
      try {
        await fs.unlink(testSparklinePath);
      } catch (error) {
        console.log(`Unable to delete the test svg file. Error: ${error}`)
      }
    }
  })

  it('should return a 400 status code', async () => {
    try {
      await axios.post(`http://${testServerIp}:${testServerPort}/api/upload-sparkline`);

    } catch(error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);

      } else {
        throw error;
      }
    }
  });
})