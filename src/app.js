require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();

// ✅ SATU KALI SAJA express.json
app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf; // Buffer untuk signature
    }
  })
);

app.use(routes);

module.exports = app; // ✅ SUDAH BENAR
