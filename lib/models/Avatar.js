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
}


module.exports = { Avatar };
