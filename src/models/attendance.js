const convertStringToDate = require("../utils/convertStringToDate");
const getDateNow = require("../utils/getDateNow");
const connection = require("../infrastructure/db/connection");
const validate = require("../validations/attendance");
const axios = require("axios");
const repo = require("../repositories/attendance");

class Attendance {
  constructor() {
    this.validDate = ({ date, now }) => {
      date >= now;
    };

    this.validCustomer = (length) => (length = 11);

    this.validate = (params) =>
      this.validations.filter((field) => {
        const { name } = field;
        const param = params[name];

        return !field.valid(param);
      });

    this.validations = [
      {
        name: "date",
        message: "Data deve ser maior ou igual a data atual!",
        valid: this.validDate,
      },
      {
        name: "customer",
        message: "Cliente deve ter pelo menos 5 caracteres!",
        valid: this.validCustomer,
      },
    ];
  }

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

    connection.query(sql, async (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const attendance = result[0];

        const cpf = attendance.customer;
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);

        attendance.customer = data;

        res.status(201).json(attendance);
      }
    });
  }

  create(attendance) {
    const date = convertStringToDate(attendance.date);
    const createdAt = getDateNow();

    const params = {
      date: { date: date, now: createdAt },
      customer: attendance.customer.length,
    };

    const errors = this.validate(params);
    if (errors.length > 0) {
      return new Promise((resolve, reject) => reject(errors));
    } else {
      const values = { ...attendance, createdAt, date };

      return repo.create(values).then((results) => {
        const id = results.insertId;
        return { ...attendance, id };
      });
    }
  }

  update(id, values, res) {
    const validations = validate.update(values);

    const errors = validations.filter((validation) => !validation.valid);
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      const updatedAt = getDateNow();

      if (values.date) {
        values.date = convertStringToDate(values.date);
      }

      const data = { ...values, updatedAt };

      const sql = `UPDATE attendances SET ? WHERE id = ?`;

      connection.query(sql, [data, id], (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json({ ...values, id });
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
