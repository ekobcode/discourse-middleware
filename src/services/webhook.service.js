// src/services/webhook.service.js
const pointMap = require("../utils/point-mapper");
const discourseService = require("./discourse.service");
const shopifyService = require("./shopify.service");

class WebhookService {
    async processDiscourseEvent({ eventType, discourseUserId }) {
        // ✅ FILTER EVENT TYPE
        if (!Object.prototype.hasOwnProperty.call(pointMap, eventType)) {
            console.log(`[Webhook] ignored eventType=${eventType}`);
            return;
        }

        const pointDelta = pointMap[eventType];

        // 1. get email from discourse
        const email = await discourseService.getUserEmailById(
            discourseUserId
        );

        if (!email) {
            console.warn(
                `[Webhook] email not found for discourseUserId=${discourseUserId}`
            );
            return;
        }

        // 2. find customer in shopify
        const customer = await shopifyService.getCustomerByEmail(email);
        if (!customer) {
            console.warn(
                `[Webhook] shopify customer not found for email=${email}`
            );
            return;
        }

        // 3. get metafield
        const metafield =
            await shopifyService.getDiscoursePointMetafield(
                customer.id
            );

        // 4. update
        const newValue =
            Number(metafield.value) + pointDelta;

        await shopifyService.updateDiscoursePoint(
            metafield.id,
            newValue
        );

        console.log(
            `[Webhook] processed eventType=${eventType} customerId=${customer.id} pointDelta=${pointDelta}`
        );
    }
}

module.exports = new WebhookService();
