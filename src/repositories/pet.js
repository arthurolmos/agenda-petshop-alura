const query = require("../infrastructure/db/queries");

class Pet {
  index() {
    const sql = "SELECT * FROM pets";

    return query(sql);
  }

  findById(id) {
    const sql = `SELECT * FROM pets WHERE id = ${id}`;

    return query(sql, id);
  }

  create(pet) {
    const sql = "INSERT INTO pets SET ?";

    return query(sql, pet);
  }

  update(id, values) {
    const sql = "UPDATE pets SET ? WHERE id = ?";

    return query(sql, [values, id]);
  }

  delete(id) {
    const sql = `DELETE FROM pets WHERE id = ?`;

    return query(sql, id);
  }
}

module.exports = new Pet();
