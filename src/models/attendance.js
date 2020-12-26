const convertStringToDate = require("../utils/convertStringToDate");
const getDateNow = require("../utils/getDateNow");
const connection = require("../infrastructure/db/connection");
const axios = require("axios");
const repo = require("../repositories/attendance");

class Attendance {
  constructor() {
    this.validDate = ({ date, now }) => date >= now;

    this.validCustomer = (length) => length === 11;

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
        message: "Cliente deve ter pelo menos 11 caracteres!",
        valid: this.validCustomer,
      },
    ];
  }

  index() {
    return repo.index().then((results) => {
      return results;
    });
  }

  findById(id, res) {
    return repo.findById(id).then(async (results) => {
      const attendance = results[0];

      const cpf = attendance.customer;
      const { data } = await axios.get(`http://localhost:8082/${cpf}`);

      attendance.customer = data;

      return attendance;
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
      const values = { ...attendance, createdAt, updatedAt: createdAt, date };

      return repo.create(values).then((results) => {
        const id = results.insertId;
        return { ...attendance, id };
      });
    }
  }

  update(id, values) {
    const updatedAt = getDateNow();

    const params = {};
    if (values.date) {
      values.date = convertStringToDate(values.date);

      params.date = { date: values.date, now: updatedAt };
    } else {
      params.date = { date: updatedAt, now: updatedAt };
    }

    if (values.customer) {
      params.customer = values.customer.length;
    } else {
      params.customer = 11;
    }

    const errors = this.validate(params);
    if (errors.length > 0) {
      return new Promise((resolve, reject) => reject(errors));
    } else {
      const data = { ...values, updatedAt };

      return repo.update(id, data).then((results) => {
        return { ...values, id };
      });
    }
  }

  delete(id) {
    return repo.delete(id).then((results) => {
      return { id };
    });
  }
}

module.exports = new Attendance();
