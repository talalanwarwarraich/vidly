const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
    // for handling uncaughtexceptions
    winston.exceptions.handle(
        new winston.transports.Console({ format: winston.format.json() }),
        new winston.transports.File({ filename: "uncaughtExceptions.log" })
    );
    //for handling unhandled Rejections.. but here we are throwing the error so winston can catch it in above code block..
    //because right now they cannot catch unhandled rejections.
    process.on("unhandledRejection", (ex) => {
        throw ex;
    });

    winston.add(new winston.transports.File({ filename: "vidly_logs.log" }));
    winston.add(
        new winston.transports.MongoDB({
            db: "mongodb://localhost/vidly",
            level: "error",
        })
    );
};
