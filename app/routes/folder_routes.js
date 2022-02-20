const {Folder, validate} = require('../models/folder');
const {User} = require("../models/user");
const {Note} = require("../models/note");
const auth = require("../middlewares/auth");
const router = require('express').Router();
const user = require("../../config/user");

router.get("/list", auth, async (req, res, next) => {
    try {
        const folders = await Folder.find({createdBy: user.userId(req)});

        res.status(200).json(folders);
    } catch (err) {
        next(err);
    }
});

router.post("/delete/:folderId", auth, async (req, res, next) => {
    try {
        const folder = await Folder.deleteOne({
            createdBy: user.userId(req),
            _id: req.params.folderId
        });

        res.status(200).json(folder);
    } catch (err) {
        next(err);
    }
});

router.post("/save", auth, async (req, res, next) => {
    try {
        const {title} = req.body;
        const validation = validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation);
        }

        const folder = await Folder.create({
            title: title,
            createdBy: user.userId(req)
        });

        res.status(201).json(folder);
    } catch (err) {
        next(err);
    }
});

module.exports = router