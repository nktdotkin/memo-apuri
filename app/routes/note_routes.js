const { Note, validate } = require('../models/note');
const { User } = require("../models/user");
const { Folder } = require("../models/folder");
const { auth, router, user } = require("../services/route_helper");

router.get("/list", auth, async (req, res, next) => {
    try {
        const notes = await Note.find({ createdBy: user.userId(req) });

        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
});

router.get("/list/:folderId", auth, async (req, res, next) => {
    try {
        const notes = await Note.find({
            createdBy: user.userId(req),
            folder: req.params.folderId
        });

        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
});

router.post("/delete/:noteId", auth, async (req, res, next) => {
    try {
        const note = await Note.deleteOne({
            createdBy: user.userId(req),
            folder: req.params.noteId
        });

        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
});

router.post("/save", auth, async (req, res, next) => {
    try {
        const { title, body, folder } = req.body;
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
        next(err);
    }
});

module.exports = router