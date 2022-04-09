const { Folder, validate } = require('../models/folder');
const { User } = require("../models/user");
const { Note } = require("../models/note");
const { router, user } = require("../helper/route_helper");

router.get("/trash", async (req, res, next) => {
    try {
        res.status(200).json(await Folder.find({
            createdBy: user.userId(req),
            isDeleted: true
        }));
    } catch (err) {
        next(err);
    }
});

router.get("/my", async (req, res, next) => {
    try {
        res.status(200).json(await Folder.find({
            createdBy: user.userId(req)
        }));
    } catch (err) {
        next(err);
    }
});

router.get("/shared", async (req, res, next) => {
    try {
        res.status(200).json(await Folder.find({
            createdBy: { $ne: user.userId(req) },
            access: user.userId(req)
        }));
    } catch (err) {
        next(err);
    }
});

router.get("/all", async (req, res, next) => {
    try {
        res.status(200).json(await Folder.find({
            access: user.userId(req),
            isDeleted: false
        }));
    } catch (err) {
        next(err);
    }
});

router.post("/delete", async (req, res, next) => {
    try {
        const folder = await Folder.findOne({
            createdBy: user.userId(req),
            _id: req.query.folderId
        });

        if (!folder)
            return res.status(200).send(`Folder ${folder.title} not found.`);

        //TODO Add note deletion here
        req.query.deletePermanently == true ?
            await Folder.deleteOne(folder) :
            await Folder.updateOne(folder, { isDeleted: true, updatedOn: Date.now() });

        res.status(200).send(`Folder ${folder.title} is deleted.`);
    } catch (err) {
        next(err);
    }
});

router.post("/add", async (req, res, next) => {
    try {
        const { title, icon, parentFolder, status, tags } = req.body;
        const validation = validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation);
        }

        const isExist = await Folder.findOne({
            createdBy: user.userId(req),
            parentFolder: parentFolder,
            title: title
        });

        if (isExist)
            return res.status(200).send(`Folder ${title} already exists.`);

        const folder = await Folder.create({
            title: title,
            icon: icon,
            createdBy: user.userId(req),
            parentFolder: parentFolder,
            status: status,
            tags: tags,
            access: [user.userId(req)]
        });

        res.status(201).json(folder);
    } catch (err) {
        next(err);
    }
});

module.exports = router