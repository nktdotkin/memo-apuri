const { Folder, validate } = require('../models/folder');
const { User } = require("../models/user");
const { Note } = require("../models/note");
const { auth, router, user } = require("../helper/route_helper");

router.get("/list", auth, async (req, res, next) => {
    try {
        switch (req.query.viewMode) {
            //MyFolders
            case 0:
                res.status(200).json(await Folder.find({
                    createdBy: user.userId(req),
                    parentFolder: req.query.parentFolder
                }));
                break;
            //Shared
            case 1:
                res.status(200).json(await Folder.find({
                    createdBy: { $ne: user.userId(req) },
                    access: { $elemMatch: user.userId(req) },
                    parentFolder: req.query.parentFolder
                }));
                break;
            //Trash
            case 2:
                res.status(200).json(await Folder.find({
                    createdBy: user.userId(req),
                    isDeleted: true
                }));
                break;
            //All
            case 3:
                res.status(200).json(await Folder.find({
                    access: { $elemMatch: user.userId(req) },
                    isDeleted: false,
                    parentFolder: req.query.parentFolder
                }));
            default:
                break;
        }
    } catch (err) {
        next(err);
    }
});

router.post("/delete", auth, async (req, res, next) => {
    try {
        const folder = await Folder.find({
            createdBy: user.userId(req),
            _id: req.query.folderId
        });

        //TODO Add note deletion here
        req.query.deletePermanently ?
            await Folder.deleteOne(folder) :
            await Folder.updateOne(folder, { $set: { "isDeleted": true, "updatedOn": Date.now } });

        res.status(200).send(`Folder ${folder.title} is deleted.`);
    } catch (err) {
        next(err);
    }
});

router.post("/add", auth, async (req, res, next) => {
    try {
        const { title, icon, parentFolder, status, tags } = req.body;
        const validation = validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation);
        }

        const isExist = await Folder.find({
            createdBy: user.userId(req),
            parentFolder: parentFolder,
            title: title
        });

        if (isExist)
            res.status(200).send(`Folder ${title} already exists.`);

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