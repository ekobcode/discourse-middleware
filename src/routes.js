const express = require("express");
const router = express.Router();
const webhookController = require("./controllers/webhook.controller");

router.post("/webhook/discourse", (req, res) =>
  webhookController.receiveDiscourse(req, res)
);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "discourse-middleware",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
