const winston = require("winston");
const express = require("express");
var app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db_connection")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port);
winston.info(`server is listening on port ${port}...`);
