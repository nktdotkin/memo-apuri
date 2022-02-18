const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    token: {
        type: String
    }
}));

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(5).required()
    });
    return schema.validate(user, {allowUnknown: true});
}

exports.validate = validateUser;
exports.User = User;