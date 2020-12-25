const convertStringToDate = require("../utils/convertStringToDate");
const getDateNow = require("../utils/getDateNow");
const connection = require("../infrastructure/db/connection");
const uploadFile = require("../infrastructure/upload/uploadFile");
// const validate = require("../validations/attendance");

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

  create(pet, res) {
    // const validations = validate.create(pet);

    // const errors = validations.filter((validation) => !validation.valid);
    // if (errors.length > 0) {
    //   res.status(400).json(errors);
    // } else {

    uploadFile(pet.image, pet.name, (err, newPath) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const createdAt = getDateNow();

        const values = { name: pet.name, image: newPath, createdAt };

        const sql = "INSERT INTO pets SET ?";

        connection.query(sql, values, (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const id = result.insertId;

            res.status(201).json({ ...pet, id });
          }
        });
      }
    });
    // }
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
