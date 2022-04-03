const Joi = require('joi');
const mongoose = require('mongoose');
const { Tag } = require('./tag');
const { User } = require('./user');
const Schema = require('mongoose').Schema;

const Folder = mongoose.model('Folder', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    icon: {
        type: String,
        default: ""
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: Folder
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Active"
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: Tag
    }],
    notesCount: {
        type: String,
        default: "0"
    },
    access: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
}));

function validateFolder(folder) {
    const schema = Joi.object({
        title: Joi.string().min(1).required()
    });
    return schema.validate(folder, { allowUnknown: true });
}

exports.validate = validateFolder;
exports.Folder = Folder;