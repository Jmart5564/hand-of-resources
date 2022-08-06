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

  static async insert({ name, pokedex_number, type }) {
    const { rows } = await pool.query(
      `
        INSERT INTO pokemon (name, pokedex_number, type)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, pokedex_number, type]
    );
    return new Pokemon(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const pokemon = await Pokemon.getById(id);
    if (!pokemon) return null;
    const updatedData = { ...pokemon, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE pokemon
      SET name = $2, pokedex_number = $3, type = $4
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.name,
        updatedData.pokedex_number,
        updatedData.type
      ]
    );
    return new Pokemon(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from pokemon
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Pokemon(rows[0]);
  }
}

module.exports = { Pokemon };
