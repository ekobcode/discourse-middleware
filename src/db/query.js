const db = require("./postgres");

/**
 * Execute postgres query with auto connection handling
 * and log response time
 */
async function executeQuery(text, params = [], options = {}) {
  const client = await db.connect();
  const startTime = process.hrtime.bigint();

  try {
    const result = await client.query(text, params);

    const endTime = process.hrtime.bigint();
    const responseTimeMs =
      Number(endTime - startTime) / 1_000_000;

    // ✅ LOG DI SINI SAJA
    console.log(
      `[DB] ${options.label || "query"} | ${responseTimeMs.toFixed(
        2
      )} ms`
    );

    return result;
  } catch (error) {
    console.error(
      `[DB ERROR] ${options.label || "query"}`,
      error
    );
    throw error;
  } finally {
    client.release(); // ⬅️ wajib
  }
}

module.exports = {
  executeQuery
};
