const webhookService = require("../services/webhook.service");

class WebhookController {
  async receiveDiscourse(req, res) {
    try {
      await webhookService.handleDiscourseWebhook(
        req.headers,
        req.body
      );

      res.status(200).json({ status: "ok" });
    } catch (err) {
      console.error("Webhook error:", err);
      res.status(500).json({ error: "internal_error" });
    }
  }
}

module.exports = new WebhookController();
