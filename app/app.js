require("dotenv").config();
require("./database/database").connect();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const { errorLogger, errorResponder, errorSafeResponder } = require("./middlewares/error");
const cookieParser = require('cookie-parser');
const { auth } = require("./helper/route_helper");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/user', require("./routes/user_routes"));
app.use('/note', require("./routes/note_routes"));
app.use('/folder', require("./routes/folder_routes"));
app.use('/tag', require("./routes/tag_routes"));

app.all('/note/*', auth);
app.all('/folder/*', auth);
app.all('/tag/*', auth);

app.use(errorLogger);
app.use(errorResponder);
app.use(errorSafeResponder);

app.use(express.static(path.join(__dirname, '../view')));

module.exports = app;