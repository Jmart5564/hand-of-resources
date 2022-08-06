const pool = require('../utils/pool');

class Cats {
  id;
  name;
  color;
  age;
  owner;

  constructor({ id, name, color, age, owner }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.age = age;
    this.owner = owner;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cats;');
    return rows.map((row) => new Cats(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Cats(rows[0]);
  }
  static async insert({ name, color, age, owner }) {
    const { rows } = await pool.query(
      `
        INSERT INTO cats (name, color, age, owner)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [name, color, age, owner]
    );
    return new Cats(rows[0]);
  }
}
module.exports = { Cats };
