const crypto = require("crypto");

const payload = JSON.stringify({ test: true });
const secret = "WGvvrlLB1dP7DhCQ2rZTmR1LEtDSaOF7";

const signature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");

console.log(`sha256=${signature}`);
