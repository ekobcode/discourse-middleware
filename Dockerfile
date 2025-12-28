# =========================
# 1️⃣ Builder Stage
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies (with cache optimization)
COPY package*.json ./

RUN npm ci --only=production

# Copy source code
COPY . .

# =========================
# 2️⃣ Runtime Stage
# =========================
FROM node:22-alpine

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

# Copy node_modules & source from builder
COPY --from=builder /app /app

# Change ownership
RUN chown -R app:app /app

USER app

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "src/server.js"]