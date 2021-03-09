const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const mongoose = require("mongoose");
const home = require("./routes/home");
const express = require("express");
var app = express();

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

mongoose
    .connect("mongodb://localhost/vidly", connectionParams)
    .then(() => console.log("Connected to mongoDb Database..."))
    .catch((err) => console.log("Error: ", err.message));

app.use(express.json());

//base url for routes
const baseUrl = "/api/";

//routes management
app.use("/", home);
app.use(`${baseUrl}genres`, genres);
app.use(`${baseUrl}customers`, customers);
app.use(`${baseUrl}movies`, movies);
app.use(`${baseUrl}rentals`, rentals);
app.use(`${baseUrl}users`, users);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server is listening on port ${port}...`);
