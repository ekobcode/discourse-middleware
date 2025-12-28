const { executeQuery } = require("../db/query");

class WebhookRepository {
  async saveDiscourseWebhook({ eventType, headers, payload }) {
    const query = `
      INSERT INTO discourse_webhooks (event_type, headers, payload)
      VALUES ($1, $2, $3)
    `;

    await executeQuery(
      query,
      [eventType, headers, payload],
      { label: "insert_discourse_webhook" }
    );
  }
}

module.exports = new WebhookRepository();
