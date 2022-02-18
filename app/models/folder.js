const Joi = require('joi');
const mongoose = require('mongoose');
const {User} = require('./user');
const Schema = require('mongoose').Schema;

const Folder = mongoose.model('Folder', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    icon: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User
    }
}));

function validateFolder(folder) {
    const schema = Joi.object({
        title: Joi.string().min(1).required()
    });
    return schema.validate(folder, {allowUnknown: true});
}

exports.validate = validateFolder;
exports.Folder = Folder;