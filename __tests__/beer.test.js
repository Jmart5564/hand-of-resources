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
  afterAll(() => {
    pool.end();
  });
});
