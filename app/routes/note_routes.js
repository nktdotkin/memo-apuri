const {Note, validate} = require('../models/note');
const {User} = require("../models/user");
const {Folder} = require("../models/folder");
const auth = require("../middlewares/auth");
const router = require('express').Router();
const user = require("../../config/user");

router.get("/list", auth, async (req, res) => {
    try {
        const notes = await Note.find({createdBy: user.userId(req)});

        res.status(200).json(notes);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.get("/list/:folderId", auth, async (req, res) => {
    try {
        const notes = await Note.find({
            createdBy: user.userId(req),
            folder: req.params.folderId
        });

        res.status(200).json(notes);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/delete/:noteId", auth, async (req, res) => {
    try {
        const note = await Note.deleteOne({
            createdBy: user.userId(req),
            folder: req.params.noteId
        });

        res.status(200).json(note);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/save", auth, async (req, res) => {
    try {
        const {title, body, folder} = req.body;
        const validation = validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation);
        }

        const note = await Note.create({
            title: title,
            body: body,
            folder: folder,
            createdBy: user.userId(req)
        });

        res.status(201).json(note);
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router