const { auth, router, user } = require("../services/route_helper");
const path = require('path');

router.get("/", async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../view/login.html'));
    } catch (err) {
        next(err);
    }
});

router.get("/index", auth, async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../view/index.html'));
    } catch (err) {
        next(err);
    }
});

module.exports = router