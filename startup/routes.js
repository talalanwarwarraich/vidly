const express = require("express");
const error = require("../middleware/error");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const home = require("../routes/home");

//base url for routes
const baseUrl = "/api/";

module.exports = function (app) {
    app.use(express.json());
    app.use("/", home);
    app.use(`${baseUrl}genres`, genres);
    app.use(`${baseUrl}customers`, customers);
    app.use(`${baseUrl}movies`, movies);
    app.use(`${baseUrl}rentals`, rentals);
    app.use(`${baseUrl}users`, users);
    app.use(`${baseUrl}auth`, auth);
    app.use(error);
};
