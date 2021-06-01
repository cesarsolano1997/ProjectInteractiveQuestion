const express = require("express");
const app = express();

// Routes server

// app.use(require('./userController'))
app.use(require("./playerController"));
app.use(require("./classroomController"));

module.exports = app;
