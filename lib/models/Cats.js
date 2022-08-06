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
}
module.exports = { Cats };
