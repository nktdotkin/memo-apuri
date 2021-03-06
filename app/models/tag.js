const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Tag = mongoose.model('Tag', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    color: {
        type: String,
        default: "",
        minlength: 6,
        maxlength: 6
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}));

function validateTag(tag) {
    const schema = Joi.object({
        title: Joi.string().min(1).required(),
        color: Joi.string().min(6).max(6).required(),
    });
    return schema.validate(tag, { allowUnknown: true, abortEarly: false });
}

exports.validate = validateTag;
exports.Tag = Tag;

