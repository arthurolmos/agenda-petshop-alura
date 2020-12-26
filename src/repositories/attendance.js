const query = require("../infrastructure/db/queries");

class Attendance {
  index() {
    const sql = "SELECT * FROM attendances";

    return query(sql);
  }

  findById(id) {
    const sql = `SELECT * FROM attendances WHERE id = ${id}`;

    return query(sql, id);
  }

  create(attendance) {
    const sql = "INSERT INTO attendances SET ?";

    return query(sql, attendance);
  }

  update(id, values) {
    const sql = "UPDATE attendances SET ? WHERE id = ?";

    return query(sql, [values, id]);
  }

  delete(id) {
    const sql = `DELETE FROM attendances WHERE id = ?`;

    return query(sql, id);
  }
}

module.exports = new Attendance();
