var express = require("express");
const formRoutes = require("./form/form.routes")

const app = express();

app.use("/form/", formRoutes);

module.exports = app;