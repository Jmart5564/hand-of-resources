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

  static async updateById(id, newAttrs) {
    const band = await Bands.getById(id);
    if (!band) return null;
    const updatedData = { ...band, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE bands
      SET name = $2, genre = $3, country = $4, band_members = $5
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.name,
        updatedData.genre,
        updatedData.country,
        updatedData.band_members,
      ]
    );
    return new Bands(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from bands
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Bands(rows[0]);
  }
}


module.exports = { Bands };
