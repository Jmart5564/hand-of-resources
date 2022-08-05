const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('bands routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /bands should return a list of bands', async () => {
    const resp = await request(app).get('/bands');
    expect(resp.body.length).toEqual(5);
    const lotus = resp.body.find(
      (bands) => bands.name === 'Lotus'
    );
    expect(lotus).toHaveProperty('genre', 'Jam Band');
    expect(lotus).toHaveProperty('country', 'USA');
    expect(lotus).toHaveProperty('band_members', 5);
  });

  it('#GET /bands/1 should return a single band with detail', async () => {
    const resp = await request(app).get('/bands/1');
    expect(resp.body).toEqual({ 
      id: '1',
      name: 'Lotus',
      genre: 'Jam Band',
      country: 'USA',
      band_members: 5 
    });
  });

  it('#POST /bands should create a new band', async () => {
    const newBand = {
      name: 'Lowkey',
      genre: 'Hip-Hop',
      country: 'UK',
      band_members: 1
    };
    const resp = await request(app).post('/bands').send(newBand);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newBand,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
