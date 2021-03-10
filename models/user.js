const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlegnth: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get("jwtPrivateKey")
    );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
