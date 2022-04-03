const Joi = require('joi');
const mongoose = require('mongoose');
const { User } = require('./user');
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
        default: ""
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User
    }
}));

function validateTag(tag) {
    const schema = Joi.object({
        tag: Joi.string().min(1).required()
    });
    return schema.validate(tag, { allowUnknown: true });
}

exports.validate = validateTag;
exports.Tag = Tag;

