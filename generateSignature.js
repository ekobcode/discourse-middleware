const crypto = require("crypto");

const payload = JSON.stringify({ test: true });
const secret = "super-secret";

const signature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");

console.log(`sha256=${signature}`);
