const pool = require('../utils/pool');

class Bands {
  id;
  name;
  genre;
  country;
  band_members;

  constructor({ id, name, genre, country, band_members }) {
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.country = country;
    this.band_members = band_members;
  }
}

static async getAll() {
    const { rows } = await pool.query('
      SELECT * from bands;
    ');
}