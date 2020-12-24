module.exports = {
  create: (values) => {
    const { customer, date, now } = values;

    const validDate = date >= now;
    const validCustomer = customer.length >= 5;

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
    const { customer, date, now } = values;

    let validDate = true;
    let validCustomer = true;

    if (date) {
      validDate = date >= now;
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
