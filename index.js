const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const home = require("./routes/home");
const express = require("express");
var app = express();

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not set.");
    process.exit(1);
}

async function connectDatabse() {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    };
    try {
        await mongoose.connect("mongodb://localhost/vidly", connectionParams);
        console.log("connection with mongoDB is successfully created.");
    } catch (error) {
        console.error("error while connecting to database.");
    }
}

connectDatabse();

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
app.use(`${baseUrl}auth`, auth);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server is listening on port ${port}...`);
