require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const bodyParser = require("body-parser");
const user_routes = require("./routes/user_routes");
const note_routes = require("./routes/note_routes");
const folder_routes = require("./routes/folder_routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use('/user', user_routes);
app.use('/note', note_routes);
app.use('/folder', folder_routes);

module.exports = app;