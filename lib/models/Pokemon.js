const pool = require('../utils/pool');

class Pokemon {
  id;
  name;
  pokedex_number;
  type;

  constructor({ id, name, pokedex_number, type, }) {
    this.id = id;
    this.name = name;
    this.pokedex_number = pokedex_number;
    this.type = type;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM pokemon;');
    return rows.map((row) => new Pokemon(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM pokemon WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Pokemon(rows[0]);
  }
}

module.exports = { Pokemon };
