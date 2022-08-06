const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('avatar routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /avatar should return a list of avatar', async () => {
    const resp = await request(app).get('/avatar');
    expect(resp.body.length).toEqual(5);
    const toph = resp.body.find(
      (avatar) => avatar.name === 'Toph'
    );
    expect(toph).toHaveProperty('affiliation', 'Earth Kingdom');
    expect(toph).toHaveProperty('is_bender', true);
    expect(toph).toHaveProperty('age', 12);
  });
  afterAll(() => {
    pool.end();
  });
});
