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
    
  });
  afterAll(() => {
    pool.end();
  });
});
