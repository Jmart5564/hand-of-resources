const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cats routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /cats should return a list of cats', async () => {
    const resp = await request(app).get('/cats');
    expect(resp.body.length).toEqual(7);
    const cats = resp.body.find(
      (cats) => cats.name === 'Momo'
    );
    expect(cats).toHaveProperty('color', 'Black');
    expect(cats).toHaveProperty('age', 2);
    expect(cats).toHaveProperty('owner', 'Colter');
  });
  afterAll(() => {
    pool.end();
  });
});
