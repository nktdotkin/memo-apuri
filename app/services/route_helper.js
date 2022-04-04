const auth = require("../middlewares/auth");
const router = require('express').Router();
const user = require("../../config/user");

module.exports = { auth, router, user }