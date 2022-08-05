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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM bands;');
    return rows.map((row) => new Bands(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM bands WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Bands(rows[0]);
  }

  static async insert({ name, genre, country, band_members }) {
    const { rows } = await pool.query(
      `
        INSERT INTO bands (name, genre, country, band_members)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [name, genre, country, band_members]
    );
    return new Bands(rows[0]);
  }
}



module.exports = { Bands };
