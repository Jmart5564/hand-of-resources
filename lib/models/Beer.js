const pool = require('../utils/pool');

class Beer {
  id;
  name;
  brewery;
  type;
  abv;

  constructor({ id, name, brewery, type, abv }) {
    this.id = id;
    this.name = name;
    this.brewery = brewery;
    this.type = type;
    this.abv = abv;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM beer;');
    return rows.map((row) => new Beer(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM beer WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Beer(rows[0]);
  }

  static async insert({ name, brewery, type, abv }) {
    const { rows } = await pool.query(
      `
        INSERT INTO beer (name, brewery, type, abv)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [name, brewery, type, abv]
    );
    return new Beer(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const beer = await Beer.getById(id);
    if (!beer) return null;
    const updatedData = { ...beer, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE beer
      SET name = $2, brewery = $3, type = $4, abv = $5
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.name,
        updatedData.brewery,
        updatedData.type,
        updatedData.abv
      ]
    );
    return new Beer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from beer
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Beer(rows[0]);
  }
}


module.exports = { Beer };
