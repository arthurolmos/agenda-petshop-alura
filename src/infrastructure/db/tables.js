class Tables {
  init(connection) {
    this.connection = connection;

    this.createAttendances();
    this.createPets();
  }

  createAttendances() {
    const sql =
      "CREATE TABLE IF NOT EXISTS attendances ( " +
      "id int NOT NULL AUTO_INCREMENT, " +
      "customer varchar(11) NOT NULL, " +
      "pet varchar(20), " +
      "service varchar(20) NOT NULL, " +
      "date datetime NOT NULL, " +
      "status varchar(20) NOT NULL, " +
      "notes text, " +
      "createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
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

  createPets() {
    const sql =
      "CREATE TABLE IF NOT EXISTS pets ( " +
      "id int NOT NULL AUTO_INCREMENT, " +
      "name varchar(50) NOT NULL, " +
      "image varchar(200), " +
      "createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "PRIMARY KEY(id) " +
      ")";

    const drop = "DROP TABLE pets";

    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Pets table created succesfully!");
      }
    });
  }
}

module.exports = new Tables();
