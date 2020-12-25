const convertStringToDate = require("../utils/convertStringToDate");
const getDateNow = require("../utils/getDateNow");

module.exports = {
  create: (values) => {
    const { customer, date } = values;

    let validDate = false;
    let validCustomer = false;

    if (date) {
      const fDate = convertStringToDate(date);
      const now = getDateNow();

      validDate = fDate >= now;
    }

    if (customer) {
      validCustomer = customer.length >= 5;
    }

    const validations = [
      {
        name: "date",
        message: "Data deve ser maior ou igual a data atual!",
        valid: validDate,
      },
      {
        name: "customer",
        message: "Cliente deve ter pelo menos 5 caracteres!",
        valid: validCustomer,
      },
    ];

    return validations;
  },

  update: (values) => {
    const { customer, date } = values;

    let validDate = true;
    let validCustomer = true;

    if (date) {
      const fDate = convertStringToDate(date);
      const now = getDateNow();

      validDate = fDate >= now;
    }

    if (customer) {
      validCustomer = customer.length >= 5;
    }

    const validations = [
      {
        name: "date",
        message: "Data deve ser maior ou igual a data atual!",
        valid: validDate,
      },
      {
        name: "customer",
        message: "Cliente deve ter pelo menos 5 caracteres!",
        valid: validCustomer,
      },
    ];

    return validations;
  },
};
