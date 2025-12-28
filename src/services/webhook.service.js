const webhookRepository = require("../repositories/webhook.repository");

class WebhookService {
  async handleDiscourseWebhook(headers, payload) {
    const eventType =
      headers["x-discourse-event"] ||
      payload?.event_type ||
      "unknown";

    await webhookRepository.save({
      eventType,
      headers,
      payload
    });
  }
}

module.exports = new WebhookService();
