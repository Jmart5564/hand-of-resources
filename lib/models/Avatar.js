const pool = require('../utils/pool');

class Avatar {
  id;
  name;
  affiliation;
  is_bender;
  age;

  constructor({ id, name, affiliation, is_bender, age }) {
    this.id = id;
    this.name = name;
    this.affiliation = affiliation;
    this.is_bender = is_bender;
    this.age = age;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM avatar_characters;');
    return rows.map((row) => new Avatar(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM avatar_characters WHERE id=$1;', [id]);
    if (!rows[0]) return null;
    return new Avatar(rows[0]);
  }

  static async insert({ name, affiliation, is_bender, age }) {
    const { rows } = await pool.query(
      `
        INSERT INTO avatar_characters (name, affiliation, is_bender, age)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [name, affiliation, is_bender, age]
    );
    return new Avatar(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const avatar = await Avatar.getById(id);
    if (!avatar) return null;
    const updatedData = { ...avatar, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE avatar_characters
      SET name = $2, affiliation = $3, is_bender = $4, age = $5
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.name,
        updatedData.affiliation,
        updatedData.is_bender,
        updatedData.age,
      ]
    );
    return new Avatar(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from avatar_characters
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Avatar(rows[0]);
  }
}



module.exports = { Avatar };
