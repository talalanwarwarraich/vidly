const mongoose = require("mongoose");
const winston = require("winston");

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

const db_address = "mongodb://localhost/vidly";

module.exports = function () {
    mongoose
        .connect(db_address, connectionParams)
        .then(() => winston.info("Connected to DB..."));
};
