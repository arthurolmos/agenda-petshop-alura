const { DateTime } = require("luxon");

module.exports = () => {
  return DateTime.local().toFormat("yyyy/MM/dd HH:mm:ss");
};
