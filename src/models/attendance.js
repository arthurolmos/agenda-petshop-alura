const { DateTime } = require("luxon");
const connection = require("../db/connection");
const validate = require("../validations/attendance");

class Attendance {
  index(res) {
    const sql = "SELECT * FROM attendances";

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(result);
      }
    });
  }

  findById(id, res) {
    const sql = `SELECT * FROM attendances WHERE id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const attendance = result[0];

        res.status(201).json(attendance);
      }
    });
  }

  create(attendance, res) {
    const date = DateTime.fromFormat(attendance.date, "dd/MM/yyyy").toFormat(
      "yyyy/MM/dd HH:mm:ss"
    );
    const createdAt = DateTime.local().toFormat("yyyy/MM/dd HH:mm:ss");

    const validations = validate.create({
      customer: attendance.customer,
      date: date,
      now: createdAt,
    });

    const errors = validations.filter((validation) => !validation.valid);
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      const data = { ...attendance, createdAt, date };

      const sql = "INSERT INTO attendances SET ?";

      connection.query(sql, data, (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(attendance);
        }
      });
    }
  }

  update(id, values, res) {
    const updatedAt = DateTime.local().toFormat("yyyy/MM/dd HH:mm:ss");

    if (values.date) {
      values.date = DateTime.fromFormat(values.date, "dd/MM/yyyy").toFormat(
        "yyyy/MM/dd HH:mm:ss"
      );
    }

    const validations = validate.update({
      customer: values.customer,
      date: values.date,
      now: updatedAt,
    });

    const errors = validations.filter((validation) => !validation.valid);
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      const data = { ...values, updatedAt };

      const sql = `UPDATE attendances SET ? WHERE id = ?`;

      connection.query(sql, [data, id], (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(values);
        }
      });
    }
  }

  delete(id, res) {
    const sql = `DELETE FROM attendances WHERE id = ?`;

    connection.query(sql, id, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Attendance();
