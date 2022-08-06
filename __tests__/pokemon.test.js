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
      type: 'Psychic'
    });
  });

  it('#POST /pokemon should create a new pokemon', async () => {
    const newPokemon = {
      name: 'Bulbasaur',
      pokedex_number: 1,
      type: 'Grass'
    };
    const resp = await request(app).post('/pokemon').send(newPokemon);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newPokemon,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
