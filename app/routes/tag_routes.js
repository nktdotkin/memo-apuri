const { Tag, validate } = require('../models/tag');
const { router, user } = require("../helper/route_helper");

router.get("/list", async (req, res, next) => {
    try {
        res.status(200).json(await Tag.find({ createdBy: user.userId(req) }));
    } catch (err) {
        next(err);
    }
});

router.post("/add", async (req, res, next) => {
    try {
        const { title, color } = req.body;
        const validation = validate(req.body);

        if (validation.error) {
            return res.status(200).send(validation);
        }

        const isExist = await Tag.find({
            createdBy: user.userId(req),
            title: title
        });

        if (isExist)
            res.status(200).json({ "error": `Tag with ${title} already exists.` });

        const tag = await Tag.create({
            title: title,
            color: color,
            createdBy: user.userId(req)
        });

        res.status(201).json(tag);
    } catch (err) {
        next(err);
    }
});

router.post("/edit", async (req, res, next) => {
    try {
        const { title, color } = req.body;
        const validation = validate(req.body);

        if (validation.error) {
            return res.status(200).send(validation);
        }

        await Tag.updateOne({ _id: req.query.tagId }, { $set: { "title": title, "color": color } })

        res.status(201).send("Tag is edited.");
    } catch (err) {
        next(err);
    }
});

module.exports = router