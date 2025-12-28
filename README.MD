
## 1️⃣ Contoh `curl` Paling Sederhana (POST webhook)

```bash
curl -X POST http://localhost:3000/webhook/discourse \
  -H "Content-Type: application/json" \
  -H "X-Discourse-Event: post_created" \
  -d '{
    "event_type": "post_created",
    "post": {
      "id": 123,
      "topic_id": 45,
      "user_id": 9,
      "username": "eko",
      "raw": "Ini isi post dari Discourse",
      "created_at": "2025-11-28T10:22:00Z"
    }
  }'
```

➡️ **Hasil yang diharapkan**

```json
{ "status": "ok" }
```

Dan data akan masuk ke tabel `discourse_webhooks`.

---

## 2️⃣ Contoh Webhook `topic_created`

```bash
curl -X POST http://localhost:3000/webhook/discourse \
  -H "Content-Type: application/json" \
  -H "X-Discourse-Event: topic_created" \
  -d '{
    "event_type": "topic_created",
    "topic": {
      "id": 888,
      "title": "Judul Topic Baru",
      "category_id": 5,
      "user_id": 9,
      "created_at": "2025-11-28T11:00:00Z"
    }
  }'
```

---

## 3️⃣ Contoh Webhook `user_created`

```bash
curl -X POST http://localhost:3000/webhook/discourse \
  -H "Content-Type: application/json" \
  -H "X-Discourse-Event: user_created" \
  -d '{
    "event_type": "user_created",
    "user": {
      "id": 77,
      "username": "newuser",
      "email": "newuser@example.com",
      "created_at": "2025-11-28T12:00:00Z"
    }
  }'
```

---

## 4️⃣ Contoh Tanpa Header `X-Discourse-Event`

(service tetap aman, event jadi `unknown`)

```bash
curl -X POST http://localhost:3000/webhook/discourse \
  -H "Content-Type: application/json" \
  -d '{
    "post": {
      "id": 999,
      "raw": "Payload tanpa header event"
    }
  }'
```

➡️ Disimpan dengan:

```
event_type = "unknown"
```

---

## 5️⃣ Cek Data di PostgreSQL

```sql
SELECT id, event_type, created_at
FROM discourse_webhooks
ORDER BY created_at DESC;
```

Atau lihat payload lengkap:

```sql
SELECT payload
FROM discourse_webhooks
LIMIT 1;
```

---

## 6️⃣ Contoh URL untuk Discourse Webhook (Real Use)

Di **Discourse Admin → API → Webhooks**

```
Payload URL: https://your-domain.com/webhook/discourse
Content-Type: application/json
```

---

