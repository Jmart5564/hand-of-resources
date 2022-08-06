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
}


module.exports = { Beer };
