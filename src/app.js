require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(routes);

module.exports = app; // ⬅️ WAJIB ADA
