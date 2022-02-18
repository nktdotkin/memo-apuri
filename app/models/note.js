const Joi = require('joi');
const mongoose = require('mongoose');
const {User} = require('./user');
const {Folder} = require('./folder');
const Schema = require('mongoose').Schema;

const Note = mongoose.model('Note', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    body: {
        type: String,
        required: false,
        minlength: 0,
        maxlength: 255
    },
    folder: {
        type: Schema.Types.ObjectId,
        ref: Folder
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User
    }
}));

function validateNote(note) {
    const schema = Joi.object({
        title: Joi.string().min(1).required()
    });
    return schema.validate(note, {allowUnknown: true});
}

exports.validate = validateNote;
exports.Note = Note;