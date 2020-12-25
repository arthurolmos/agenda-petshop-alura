const connection = require("./connection");

const execQuery = (sql, params = "") => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = execQuery;
