const crypto = require("crypto");

module.exports = function discourseSignatureMiddleware(req, res, next) {
  const signatureHeader =
    req.headers["x-discourse-event-signature"];

  if (!signatureHeader) {
    return res.status(401).json({
      error: "missing_discourse_signature"
    });
  }

  if (!req.rawBody) {
    console.error("[Discourse] rawBody missing");
    return res.status(400).json({
      error: "raw_body_missing"
    });
  }

  const secret = process.env.DISCOURSE_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({
      error: "server_misconfigured"
    });
  }

  const [algo, signature] = signatureHeader.split("=");

  if (algo !== "sha256" || !signature) {
    return res.status(401).json({
      error: "invalid_signature_format"
    });
  }

  const computedSignature = crypto
    .createHmac("sha256", secret)
    .update(req.rawBody) // ✅ sekarang Buffer
    .digest("hex");

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );

  if (!isValid) {
    return res.status(401).json({
      error: "invalid_discourse_signature"
    });
  }

  next();
};
