const crypto = require("crypto");

module.exports = function discourseSignatureMiddleware(req, res, next) {
  const signatureHeader =
    req.headers["x-discourse-event-signature"];

  if (!signatureHeader) {
    return res.status(401).json({
      error: "missing_discourse_signature"
    });
  }

  const secret = process.env.DISCOURSE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[Discourse] secret not configured");
    return res.status(500).json({
      error: "server_misconfigured"
    });
  }

  // Format: sha256=xxxx
  const [algo, signature] = signatureHeader.split("=");

  if (algo !== "sha256" || !signature) {
    return res.status(401).json({
      error: "invalid_signature_format"
    });
  }

  const computedSignature = crypto
    .createHmac("sha256", secret)
    .update(req.rawBody)
    .digest("hex");

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computedSignature)
    )
  ) {
    return res.status(401).json({
      error: "invalid_discourse_signature"
    });
  }

  next(); // ✅ signature valid
};
