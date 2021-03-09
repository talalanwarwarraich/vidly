const Joi = require("joi");
const { genreSchema } = require("../models/genre");
const mongoose = require("mongoose");
const { number } = require("joi");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(genre) {
    const schema = Joi.object({
        title: Joi.string().required().min(3),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required().min(0).max(255),
        dailyRentalRate: Joi.number().required().min(0).max(255),
    });
    return schema.validate(genre);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
