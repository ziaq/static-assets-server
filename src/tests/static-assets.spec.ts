import request from 'supertest';
import { app } from '../index';

describe('GET static assets /sparklines and /token-logos', () => {
  it('should return token logo', async () => {
    const testFileName = 'test-logo.png';

    const res = await request(app)
      .get(`/token-logos/${testFileName}`)
      .expect('Cache-Control', 'max-age=31536000')
      .expect('X-Content-Type-Options', 'nosniff')
      .expect(200);
    
    expect(res.body).not.toBeNull();
    expect(res.body.length).toBeGreaterThan(0);
  })

  it('should return sparkline', async () => {
    const testFileName = 'test-sparkline.svg';
    
    const res = await request(app)
      .get(`/sparklines/${testFileName}`)
      .expect('Cache-Control', 'max-age=7200')
      .expect(200)

    expect(res.body).not.toBeNull();
    expect(res.body.length).toBeGreaterThan(0);
  })

  it('should return a 404 status code for non-existent token logo', async () => {
    const res = await request(app)
      .get('/token-logos/non-existent.png')
      .expect(404)

    expect(res.text).toContain('File not found');
  })

  it('should return a 404 status code for non-existent sparkline', async () => {
    const res = await request(app)
      .get('/sparklines/non-existent.png')
      .expect(404)

    expect(res.text).toContain('File not found');
  })
})