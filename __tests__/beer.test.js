const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('beer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /beer should return a list of beer', async () => {
    const resp = await request(app).get('/beer');
    expect(resp.body.length).toEqual(6);
    const goat = resp.body.find(
      (beer) => beer.name === 'The Goat'
    );
    expect(goat).toHaveProperty('brewery', 'Holy Mountain');
    expect(goat).toHaveProperty('type', 'Saison');
    expect(goat).toHaveProperty('abv', '4.9%');
  });

  it('#GET /beer/1 should return a single beer with detail', async () => {
    const resp = await request(app).get('/beer/1');
    expect(resp.body).toEqual({ 
      id: '1',
      name: 'The Goat',
      brewery: 'Holy Mountain',
      type: 'Saison',
      abv: '4.9%'
    });
  });
  afterAll(() => {
    pool.end();
  });
});
