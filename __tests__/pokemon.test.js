const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('pokemon routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /pokemon should return a list of pokemon', async () => {
    const resp = await request(app).get('/pokemon');
    expect(resp.body.length).toEqual(6);
    const kadabra = resp.body.find(
      (pokemon) => pokemon.name === 'Kadabra'
    );
    expect(kadabra).toHaveProperty('pokedex_number', 64);
    expect(kadabra).toHaveProperty('Type', 'Psychic');
  });
  afterAll(() => {
    pool.end();
  });
});
