const express = require("./config/express");
const connection = require("./db/connection");
const Tables = require("./db/tables");

connection.connect((err) => {
  if (err) console.log("Error on connection", err);

  console.log("CONNECTED SUCCESFULLY");

  Tables.init(connection);

  const app = express();

  app.listen(3000);

  console.log("LISTENING ON PORT 3000");
});
