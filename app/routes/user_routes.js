const { User, validate } = require('../models/user');
const bcrypt = require('bcryptjs');
const { router } = require("../helper/route_helper");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const validation = validate(req.body);

        if (validation.error) {
            return res.status(200).send(validation);
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ "error": "User Already Exist." });
        }

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, 10),
        });

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validation = validate(req.body);

        if (validation.error) {
            return res.status(200).send(validation);
        }

        const existingUser = await User.findOne({ email });

        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            existingUser.token = jwt.sign(
                { user_id: existingUser._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            res.status(200).json({ "x-access-token": existingUser.token });
            return;
        }

        res.status(200).json({ "error": "Invalid login or password." });
    } catch (err) {
        next(err);
    }
});

module.exports = router