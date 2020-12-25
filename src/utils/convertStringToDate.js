const { DateTime } = require("luxon");

module.exports = (string) => {
  const date = DateTime.fromFormat(string, "dd/MM/yyyy").toFormat(
    "yyyy/MM/dd HH:mm:ss"
  );

  return date;
};
