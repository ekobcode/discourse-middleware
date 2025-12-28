// src/controllers/webhook.controller.js
const webhookService = require("../services/webhook.service");

class WebhookController {
  async receiveDiscourse(req, res) {
    try {
      const eventType = req.headers["x-discourse-event"];

      // Ambil user id dari berbagai kemungkinan payload
      const discourseUserId =
        req.body?.post?.user_id ||
        req.body?.topic?.user_id ||
        req.body?.like?.post?.user_id;

      if (!eventType || !discourseUserId) {
        console.warn(
          "[Webhook] invalid payload",
          JSON.stringify(req.body)
        );
        return res.status(200).json({ status: "ignored" });
      }

      await webhookService.processDiscourseEvent({
        eventType,
        discourseUserId
      });

      res.status(200).json({ status: "ok" });
    } catch (err) {
      console.error("[Webhook] error:", err);
      res.status(500).json({ error: "internal_error" });
    }
  }
}

module.exports = new WebhookController();
