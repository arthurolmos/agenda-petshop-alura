class Tables {
  init(connection) {
    this.connection = connection;

    this.createAttendance();
  }

  createAttendance() {
    const sql =
      "CREATE TABLE IF NOT EXISTS attendances( " +
      "id int NOT NULL AUTO_INCREMENT, " +
      "customer varchar(50) NOT NULL, " +
      "pet varchar(20), " +
      "service varchar(20) NOT NULL, " +
      "date datetime NOT NULL, " +
      "status varchar(20) NOT NULL, " +
      "notes text, " +
      "createdAt datetime NOT NULL, " +
      "updatedAt datetime NOT NULL, " +
      "PRIMARY KEY(id) " +
      ")";

    const drop = "DROP TABLE attendances";

    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Attendance table created succesfully!");
      }
    });
  }
}

module.exports = new Tables();
