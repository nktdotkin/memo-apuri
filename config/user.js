const jwt = require("jsonwebtoken");

exports.userId = (req) => {
    const userId = jwt.decode(req.headers["x-access-token"]).user_id;
    console.log(`Method: ${req.originalUrl} User: ${userId}`);
    return userId;
};