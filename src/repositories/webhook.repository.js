const db = require("../db/postgres");

class WebhookRepository {
  async save({ eventType, headers, payload }) {
    await db.query(
      `
      INSERT INTO discourse_webhooks (event_type, headers, payload)
      VALUES ($1, $2, $3)
      `,
      [eventType, headers, payload]
    );
  }
}

module.exports = new WebhookRepository();
