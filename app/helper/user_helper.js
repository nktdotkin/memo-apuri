const jwt = require("jsonwebtoken");

exports.userId = (req) => {
    const token = req.headers["x-access-token"] || req.cookies['x-access-token'];
    const userId = jwt.decode(token).user_id;
    console.log(`Method: ${req.originalUrl} User: ${userId}`);
    return userId;
};