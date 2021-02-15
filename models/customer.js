const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(255),
        phone: Joi.string().required().min(5).max(255),
        isGold: Joi.boolean(),
    });
    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
