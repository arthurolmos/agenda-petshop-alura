const query = require("../infrastructure/db/queries");

class Attendance {
  create(attendance) {
    const sql = "INSERT INTO attendances SET ?";

    return query(sql, attendance);
  }
}

module.exports = new Attendance();
