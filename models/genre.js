const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });
    return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
