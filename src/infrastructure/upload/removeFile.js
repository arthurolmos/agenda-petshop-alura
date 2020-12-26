const fs = require("fs");
const path = require("path");

module.exports = (filePath, cb) => {
  try {
    fs.rm(filePath, () => cb(false));
  } catch (err) {
    cb(err);
  }
};
