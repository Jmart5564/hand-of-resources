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
  it('#GET /avatar/1 should return a single avatar with detail', async () => {
    const resp = await request(app).get('/avatar/1');
    expect(resp.body).toEqual({ 
      id: '1',
      name: 'Toph',
      affiliation: 'Earth Kingdom',
      is_bender: true,
      age: 12 
    });
  });
  it('#POST /avatar should create a new avatar', async () => {
    const newAvatar = {
      name: 'Iroh',
      affiliation: 'Fire Nation',
      is_bender: false,
      age: 98
    };
    const resp = await request(app).post('/avatar').send(newAvatar);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newAvatar,
    });
  });
  it('#PUT /avatar/:id should update an existing avatar', async () => {
    const resp = await request(app).put('/avatar/1').send({
      age: 23,
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.age).toBe(23);
  });
  afterAll(() => {
    pool.end();
  });
});
