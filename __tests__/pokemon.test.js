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
    expect(kadabra).toHaveProperty('type', 'Psychic');
  });

  it('#GET /pokemon/1 should return a single pokemon with detail', async () => {
    const resp = await request(app).get('/pokemon/1');
    expect(resp.body).toEqual({ 
      id: '1',
      name: 'Kadabra',
      pokedex_number: 64,
      type: 'Psychic',
    });
  });
  afterAll(() => {
    pool.end();
  });
});
